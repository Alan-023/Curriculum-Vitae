import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { ReactiveShaderBackdrop } from './ReactiveShaderBackdrop';
import { MorphingLiquidCore } from './MorphingLiquidCore';

/**
 * Persistent Full-Viewport WebGL Stage with Zero-External-CDN Procedural HDRI Studio
 * and Adaptive GPU Performance Scaling.
 */
export const SceneCanvas: React.FC = () => {
  const [highQuality, setHighQuality] = useState(true);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden">
      <Canvas
        dpr={highQuality ? [1, 1.75] : [1, 1.2]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#030407']} />

        <PerformanceMonitor
          onDecline={() => setHighQuality(false)}
          onIncline={() => setHighQuality(true)}
        />

        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 8, 5]} intensity={1.8} color="#f8fafc" />
        <pointLight position={[-5, -3, 3]} intensity={1.4} color="#38bdf8" />
        <pointLight position={[4, -4, 2]} intensity={1.1} color="#a855f7" />

        {/* Zero-network-latency Studio HDRI Lightformers for Razor-Sharp Glass Speculars */}
        <Environment resolution={256} frames={1}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer
              intensity={4.2}
              rotation-x={Math.PI / 2}
              position={[0, 5, -6]}
              scale={[12, 2.5, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={3.0}
              rotation-y={Math.PI / 2}
              position={[-6, 1, -1]}
              scale={[10, 2, 1]}
              color="#38bdf8"
            />
            <Lightformer
              intensity={2.6}
              rotation-y={-Math.PI / 2}
              position={[6, 2, -1]}
              scale={[10, 2, 1]}
              color="#c084fc"
            />
            <Lightformer
              intensity={2.0}
              rotation-x={-Math.PI / 2}
              position={[0, -5, 2]}
              scale={[10, 3, 1]}
              color="#fb923c"
            />
          </group>
        </Environment>

        <Suspense fallback={null}>
          <ReactiveShaderBackdrop />
          <MorphingLiquidCore highQuality={highQuality} />
        </Suspense>
      </Canvas>
    </div>
  );
};
