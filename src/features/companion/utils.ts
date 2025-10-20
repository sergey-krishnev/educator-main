/* ===================== Helpers ===================== */

export function safeJSON(s: string) {
  try { return JSON.parse(s) } catch { return null }
}

export async function decodeBase64ToAudioBuffer(ctx: AudioContext, b64: string): Promise<AudioBuffer> {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return await ctx.decodeAudioData(bytes.buffer.slice(0))
}