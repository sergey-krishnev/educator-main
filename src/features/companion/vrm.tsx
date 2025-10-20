import { useFrame, useLoader } from "@react-three/fiber";
import { VRM, VRMLoaderPlugin, VRMUtils, VRMExpressionPresetName } from "@pixiv/three-vrm";
import { useAnimations, useFBX } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { remapMixamoAnimationToVrm } from "./utils/remapMixamoAnimationToVRM";

type BlinkState = "idle" | "closing" | "hold" | "opening";

type BlinkOptions = {
  minPeriodSec?: number;
  maxPeriodSec?: number;
  closeDur?: number;
  holdDur?: number;
  openDur?: number;
  strength?: number;
};

export function VRMAvatar({
  url,
  onLoad,
  idleFbx = "anims/Idle.fbx",
  idleEnabled = true,
  blink = {},
}: {
  url: string;
  onLoad?: (v: VRM) => void;
  idleFbx?: string;
  idleEnabled?: boolean;
  blink?: BlinkOptions;
}) {
  // ======= Defaults =======
  const {
    minPeriodSec = 4.5,
    maxPeriodSec = 6.5,
    closeDur = 0.06,
    holdDur = 0.02,
    openDur = 0.06,
    strength = 1.0,
  } = blink;

  const nextPeriodSec = () => THREE.MathUtils.randFloat(minPeriodSec, maxPeriodSec);

  // ======= Load VRM =======
  const gltf = useLoader(GLTFLoader, url, (loader: any) => {
    loader.register((parser: any) => new VRMLoaderPlugin(parser));
  });
  const [model, setModel] = useState<VRM | null>(null);
  const vrmRef = useRef<VRM | null>(null);

  // ======= Root for animations =======
  const rootRef = useRef<THREE.Group>(null);

  // ======= Load & remap animations =======
  const idleAsset = useFBX(idleFbx);
  const wavingAsset = useFBX("anims/Waving.fbx");
  const v: VRM | undefined = gltf?.userData?.vrm;

  const idleClip = useMemo(() => {
    const clip = remapMixamoAnimationToVrm(v, idleAsset);
    clip.name = "Idle";
    return clip;
  }, [idleAsset, v]);

  const wavingClip = useMemo(() => {
    const clip = remapMixamoAnimationToVrm(v, wavingAsset);
    clip.name = "Waving";
    return clip;
  }, [wavingAsset, v]);

  const { actions, mixer } = useAnimations([idleClip, wavingClip], rootRef);

  // ------- Blink helpers (без изменений) -------
  const blinkKeyRef = useRef<string | VRMExpressionPresetName | null>(null);
  function detectBlinkKey(vrm: VRM): string | VRMExpressionPresetName | null {
    if (vrm.expressionManager?.getExpression?.(VRMExpressionPresetName.Blink)) {
      return VRMExpressionPresetName.Blink;
    }
    const names = vrm.expressionManager?.expressions?.map((e) => e.name) ?? [];
    const fallback = names.find((n) => /^(closed|eyesclosed|blink)$/i.test(n));
    return fallback ?? null;
  }
  function setBlinkValue(val: number) {
    const vrm = vrmRef.current;
    const key = blinkKeyRef.current;
    if (!vrm || !key) return;
    vrm.expressionManager?.setValue(key as any, THREE.MathUtils.clamp(val, 0, 1));
  }

  const stateRef = useRef<BlinkState>("idle");
  const timerRef = useRef(0);
  const sinceLastBlinkRef = useRef(0);
  const periodRef = useRef<number>(nextPeriodSec());

  // Init VRM
  useEffect(() => {
    if (!v) return;
    VRMUtils.removeUnnecessaryVertices(v.scene);
    VRMUtils.combineSkeletons(v.scene);
    v.scene.traverse((o: THREE.Object3D) => (o.frustumCulled = false));

    setModel(v);
    vrmRef.current = v;

    blinkKeyRef.current = detectBlinkKey(v);
    setBlinkValue(0);

    onLoad?.(v);

    return () => v?.dispose?.();
  }, [gltf, onLoad, v]);

  // ======= Intro sequencing: Idle (1 цикл) -> Waving (1 раз) -> Idle (беск.) =======
  useEffect(() => {
    if (!mixer || !actions) return;

    const idle = actions.Idle;
    const wave = actions.Waving;

    if (!idleEnabled || !idle) return;

    // 1) Стартуем Idle на один цикл
    idle.reset();
    idle.enabled = true;
    idle.setLoop(THREE.LoopOnce, 0);
    idle.clampWhenFinished = true;
    idle.fadeIn(0.25).play();

    const onFinishedIdle = (e: any) => {
      if (e.action !== idle) return;

      // 2) Когда первый цикл Idle закончился — запускаем Waving (если есть)
      if (wave) {
        wave.reset();
        wave.enabled = true;
        wave.setLoop(THREE.LoopOnce, 0);
        wave.clampWhenFinished = true;

        // плавный переход из Idle в Waving
        wave.crossFadeFrom(idle, 0.3, false);
        wave.play();

        const onFinishedWave = (ev: any) => {
          if (ev.action !== wave) return;

          // 3) После Waving — ставим Idle на бесконечный луп
          idle.reset();
          idle.enabled = true;
          idle.setLoop(THREE.LoopRepeat, Infinity);
          idle.clampWhenFinished = false;
          idle.crossFadeFrom(wave, 0.3, false);
          idle.play();

          mixer.removeEventListener("finished", onFinishedWave);
        };

        mixer.addEventListener("finished", onFinishedWave);
      } else {
        // Если Waving нет — просто продолжаем Idle бесконечно
        idle.reset();
        idle.enabled = true;
        idle.setLoop(THREE.LoopRepeat, Infinity);
        idle.clampWhenFinished = false;
        idle.fadeIn(0.2).play();
      }

      mixer.removeEventListener("finished", onFinishedIdle);
    };

    mixer.addEventListener("finished", onFinishedIdle);

    return () => {
      mixer.removeEventListener("finished", onFinishedIdle);
    };
  }, [actions, mixer, idleEnabled]);

  // Update loop (анимация + мигание)
  useFrame((_, delta) => {
    mixer?.update(delta);

    if (blinkKeyRef.current) {
      timerRef.current += delta;
      sinceLastBlinkRef.current += delta;

      switch (stateRef.current) {
        case "idle": {
          setBlinkValue(0);
          if (sinceLastBlinkRef.current >= periodRef.current) {
            stateRef.current = "closing";
            timerRef.current = 0;
            sinceLastBlinkRef.current = 0;
          }
          break;
        }
        case "closing": {
          const t = Math.min(1, timerRef.current / closeDur);
          const eased = t * t;
          setBlinkValue(THREE.MathUtils.lerp(0, strength, eased));
          if (timerRef.current >= closeDur) {
            stateRef.current = "hold";
            timerRef.current = 0;
            setBlinkValue(strength);
          }
          break;
        }
        case "hold": {
          setBlinkValue(strength);
          if (timerRef.current >= holdDur) {
            stateRef.current = "opening";
            timerRef.current = 0;
          }
          break;
        }
        case "opening": {
          const t = Math.min(1, timerRef.current / openDur);
          const eased = 1 - (1 - t) * (1 - t);
          setBlinkValue(THREE.MathUtils.lerp(strength, 0, eased));
          if (timerRef.current >= openDur) {
            stateRef.current = "idle";
            timerRef.current = 0;
            setBlinkValue(0);
            periodRef.current = nextPeriodSec();
          }
          break;
        }
      }
    }

    vrmRef.current?.update?.(delta);
  });

  useEffect(() => {
    return () => setBlinkValue(0);
  }, []);

  return model ? (
    <group ref={rootRef}>
      <primitive object={model.scene} />
    </group>
  ) : null;
}

