import { Canvas } from "@react-three/fiber"
import React, { Suspense } from "react"
import { VRMAvatar } from "./vrm"
import { VRM } from "@pixiv/three-vrm"

export const ChatScene = React.memo(function ChatScene({handleVrmLoad} : { handleVrmLoad?: (v: VRM) => void }) {
    return (
        <Canvas
            camera={{ position: [0, 1.35, 1.2], fov: 28 }}
            onCreated={({ camera }) => camera.lookAt(0, 1.31, 0)}
        >
            <ambientLight intensity={0.9} />
            <directionalLight position={[1, 2, 1]} intensity={1} />
            <Suspense fallback={null}>
                <VRMAvatar url="/avatars/android_assistant.vrm" onLoad={handleVrmLoad} />
            </Suspense>
        </Canvas>
    )
})
