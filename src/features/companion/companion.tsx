import { useEffect, useRef, useState, useCallback } from "react"
import { VRM } from "@pixiv/three-vrm"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { decodeBase64ToAudioBuffer, safeJSON } from "./utils"
import { ChatScene } from "./scene"

/* ===================== WS singleton (dev-safe) ===================== */

let _socket: WebSocket | null = null
let _listeners: Array<(ev: MessageEvent<string>) => void> = []

function getSocket(): WebSocket {
  const url = `${location.origin.replace(/^http/, "ws")}/ws/chat`
  if (_socket && (_socket.readyState === WebSocket.OPEN || _socket.readyState === WebSocket.CONNECTING)) {
    return _socket
  }
  _socket = new WebSocket(url)
  _socket.onmessage = (ev) => _listeners.forEach((fn) => fn(ev as MessageEvent<string>))
  _socket.onclose = () => { _socket = null }
  return _socket
}
function onWSMessage(fn: (ev: MessageEvent<string>) => void) {
  _listeners.push(fn)
  return () => { _listeners = _listeners.filter((f) => f !== fn) }
}
function sendJSON(payload: unknown) {
  const ws = getSocket()
  const send = () => ws.send(JSON.stringify(payload))
  if (ws.readyState === WebSocket.OPEN) send()
  else ws.addEventListener("open", send, { once: true })
}

/* ===================== Types ===================== */

type Sub = { id: string; text: string; role: "user" | "assistant" }

/* ===================== Tiny UI helpers ===================== */

function Avatar({ role }: { role: "user" | "assistant" }) {
  const isUser = role === "user"
  return (
    <div
      className={[
        "shrink-0 h-7 w-7 rounded-full grid place-items-center text-[10px] font-medium",
        isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        "shadow"
      ].join(" ")}
      aria-hidden
    >
      {isUser ? "You" : "AI"}
    </div>
  )
}

function ChatBubble({ sub }: { sub: Sub }) {
  const isUser = sub.role === "user"
  return (
    <div className={["flex items-end gap-2", isUser ? "justify-end" : "justify-start"].join(" ")}>

      {/* Assistant: аватар слева, User: пустой отступ чтобы выровнять */}
      {!isUser ? <Avatar role="assistant" /> : <div className="w-7 shrink-0" />}

      <div
        className={[
          "relative max-w-[75%] px-3 py-2 text-sm shadow-sm",
          "break-words whitespace-pre-wrap",
          isUser
            ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
            : "bg-muted text-foreground rounded-2xl rounded-bl-sm"
        ].join(" ")}
      >
        {sub.text}
      </div>

      {/* User: аватар справа, Assistant: пустой отступ */}
      {isUser ? <Avatar role="user" /> : <div className="w-7 shrink-0" />}
    </div>
  )
}

/* ===================== Component ===================== */

export default function OverlayVRoidChat() {
  const [subs, setSubs] = useState<Sub[]>([])
  const [input, setInput] = useState("")
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem("overlay-vroid-chat:collapsed") === "1" } catch { return false }
  })

  // persist collapsed state
  useEffect(() => {
    try { localStorage.setItem("overlay-vroid-chat:collapsed", collapsed ? "1" : "0") } catch { /* empty */ }
  }, [collapsed])

  // close on Escape when открыт
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (!collapsed && e.key === "Escape") setCollapsed(true) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [collapsed])

  // audio + lipsync state
  const audioCtxRef = useRef<AudioContext | null>(null)
  const playHeadRef = useRef(0)
  const visemesRef = useRef<{ t: number; v: "A" | "Rest" }[]>([])
  const visemeStartPerfRef = useRef(0)
  const lipLoopRef = useRef<number | null>(null)

  // expression mapping (VRM1.0)
  const exprNameRef = useRef<string | null>(null)
  const vrmRef = useRef<VRM | null>(null)

  // subscribe WS once
  useEffect(() => {
    getSocket()
    const off = onWSMessage(async (ev) => {
      const data = safeJSON(ev.data)
      if (!data) return
      if (data.type === "assistant_text") {
        pushSub(data.text, "assistant")
      } else if (data.type === "tts_chunk") {
        await enqueueAudioBase64(data.audio_base64)
      }
    })
    return () => { off() }
  }, [])

  const pushSub = (text: string, role: "user" | "assistant") =>
    setSubs((s) => [...s, { id: crypto.randomUUID(), text, role }])

  const sendText = () => {
    const t = input.trim()
    if (!t) return
    pushSub(t, "user")
    sendJSON({ type: "user_text", text: t })
    setInput("")
  }

  /* ===================== Lip-sync helpers ===================== */

  const setViseme = useCallback((v: "A" | "Rest") => {
    const vrmObj = vrmRef.current
    if (!vrmObj) return
    const em = vrmObj.expressionManager
    const open = v === "A" ? 1 : 0
    if (em?.setValue) {
      const name = exprNameRef.current
      if (name) { em.setValue(name, open); return }
      em.setValue("aa", open); exprNameRef.current = "aa"
    }
  }, [])

  function ensureAudio() { return (audioCtxRef.current ??= new AudioContext()) }

  async function enqueueAudioBase64(b64: string) {
    const ctx = ensureAudio()
    await ctx.resume().catch(() => {})
    const buf = await decodeBase64ToAudioBuffer(ctx, b64)

    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    const now = ctx.currentTime
    const at = Math.max(now + 0.03, playHeadRef.current || now + 0.03)
    src.start(at)
    playHeadRef.current = at + (buf.duration || 0)

    const vis = buildVisemesFromBuffer(buf)
    visemesRef.current = vis

    const perfNowSec = performance.now() / 1000
    const ts = ctx.getOutputTimestamp?.()
    const ctxTime = typeof ts?.contextTime === "number" ? ts.contextTime : ctx.currentTime
    const deltaAudioToPerf = perfNowSec - ctxTime
    visemeStartPerfRef.current = at + deltaAudioToPerf

    src.onended = () => setViseme("Rest")
    kickLipSyncLoop()
  }

  function buildVisemesFromBuffer(buf: AudioBuffer) {
    const ch = buf.getChannelData(0)
    const sr = buf.sampleRate
    const win = Math.floor(sr * 0.02)
    const hop = Math.floor(sr * 0.01)
    const raw: { t: number; v: "A" | "Rest" }[] = []
    let i = 0
    while (i + win <= ch.length) {
      let sum = 0
      for (let j = 0; j < win; j++) { const s = ch[i + j]; sum += s * s }
      const rms = Math.sqrt(sum / win)
      const open = rms > 0.03
      raw.push({ t: i / sr, v: open ? "A" : "Rest" })
      i += hop
    }
    const merged: { t: number; v: "A" | "Rest" }[] = []
    let last: "A" | "Rest" | null = null
    for (const e of raw) {
      if (e.v !== last) { merged.push(e); last = e.v }
    }
    merged.push({ t: buf.duration, v: "Rest" })
    return merged
  }

  function kickLipSyncLoop() {
    if (lipLoopRef.current) cancelAnimationFrame(lipLoopRef.current)
    const loop = () => {
      if (vrmRef.current && visemesRef.current.length) {
        const nowPerf = performance.now() / 1000
        const tFromStart = nowPerf - visemeStartPerfRef.current
        const arr = visemesRef.current
        let idx = -1
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].t <= tFromStart) idx = i; else break
        }
        if (idx >= 0) setViseme(arr[idx].v)
      }
      lipLoopRef.current = requestAnimationFrame(loop)
    }
    lipLoopRef.current = requestAnimationFrame(loop)
  }

  /* ===================== UI ===================== */

  const handleVrmLoad = useCallback((v: VRM) => { vrmRef.current = v }, [])

  // автоскролл к последнему сообщению
  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [subs, collapsed])

  const insetSafe = "bottom-[max(env(safe-area-inset-bottom),1rem)] right-[max(env(safe-area-inset-right),1rem)]"

  return (
    <>
      {/* Кнопка открытия — в углу */}
      <div className={`fixed ${insetSafe} z-[10000]`}>
        <Button
          onClick={() => setCollapsed(false)}
          className={[
            "rounded-full h-12 w-12 shadow-xl transition duration-200",
            "motion-reduce:transition-none",
            collapsed
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none",
          ].join(" ")}
          variant="default"
          size="icon"
          aria-label="Open chat"
          aria-hidden={!collapsed}
          title="Open chat"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
          </svg>
        </Button>
      </div>

      {/* Карточка — фикс в углу */}
      <div
        className={[
          `fixed ${insetSafe} z-[9999] transition duration-200 transform`,
          "motion-reduce:transition-none",
          collapsed
            ? "opacity-0 scale-95 translate-y-2 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0 pointer-events-auto",
        ].join(" ")}
        aria-hidden={collapsed}
      >
        <div className="w-[380px] max-w-[92vw]">
          <Card className="relative overflow-visible border border-border/60 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-card/90 rounded-2xl">
            {/* Кнопка сворачивания */}
            <Button
              onClick={() => setCollapsed(true)}
              variant="ghost"
              size="icon"
              aria-label="Collapse"
              title="Collapse"
              className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur border shadow-md hover:bg-background transition"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </Button>

            <CardContent className="p-3">
              {/* Сцена */}
              <div className="h-60 rounded-xl border bg-muted overflow-hidden">
                <ChatScene handleVrmLoad={handleVrmLoad}/>
              </div>

              {/* Список сообщений (мессенджерный) */}
              <div
                ref={listRef}
                className="mt-3 max-h-56 overflow-y-auto pr-1 space-y-2"
                role="log"
                aria-live="polite"
              >
                {subs.map((s) => (
                  <ChatBubble key={s.id} sub={s} />
                ))}
              </div>

              {/* Ввод */}
              <div className="mt-3 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendText()}
                  placeholder="Type and press Enter…"
                  className="flex-1"
                />
                <Button onClick={sendText} className="shrink-0">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
