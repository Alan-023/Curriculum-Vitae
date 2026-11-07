import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Bounds,
  Center,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';
import { Box, RotateCcw, Upload } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import type { PortfolioContent } from '../../data/portfolioData';

export const DEFAULT_GLB_PATH = '/models/aumovio-prism.glb';

interface RefractiveGLBModelProps {
  url: string;
  ior: number;
  dispersion: number;
  distortion: number;
}

const RefractiveGLBModel: React.FC<RefractiveGLBModelProps> = ({
  url,
  ior,
  dispersion,
  distortion,
}) => {
  const { scene } = useGLTF(url);
  const groupRef = React.useRef<THREE.Group>(null);

  // Extract all mesh geometries from the loaded .glb so every single mesh gets physical Liquid Glass!
  const extractedMeshes = useMemo(() => {
    const list: {
      geometry: THREE.BufferGeometry;
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      scale: THREE.Vector3;
      name: string;
    }[] = [];

    scene.updateMatrixWorld(true);
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();
        const scl = new THREE.Vector3();
        m.matrixWorld.decompose(pos, quat, scl);
        list.push({
          geometry: m.geometry,
          position: pos,
          quaternion: quat,
          scale: scl,
          name: m.name || 'glb-part',
        });
      }
    });
    return list;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.42;
    }
  });

  return (
    <Bounds fit clip observe margin={1.35}>
      <Center>
        <group ref={groupRef}>
          {extractedMeshes.map((item, index) => (
            <mesh
              key={`${item.name}-${index}`}
              geometry={item.geometry}
              position={item.position}
              quaternion={item.quaternion}
              scale={item.scale}
            >
              <MeshTransmissionMaterial
                backside
                backsideThickness={0.35}
                samples={8}
                resolution={512}
                transmission={1}
                roughness={0.03}
                thickness={0.85}
                ior={ior}
                chromaticAberration={dispersion}
                anisotropy={0.35}
                distortion={distortion}
                distortionScale={0.3}
                temporalDistortion={0.22}
                color="#ffffff"
              />
            </mesh>
          ))}
        </group>
      </Center>
    </Bounds>
  );
};

useGLTF.preload(DEFAULT_GLB_PATH);

interface GLBOpticalSandboxProps {
  content: PortfolioContent['glbStage'];
}

export const GLBOpticalSandbox: React.FC<GLBOpticalSandboxProps> = ({ content }) => {
  const [modelUrl, setModelUrl] = useState<string>(DEFAULT_GLB_PATH);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const [activePresetIdx, setActivePresetIdx] = useState<number>(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const preset = content.presets[activePresetIdx] ?? content.presets[0];

  useEffect(() => {
    return () => {
      if (modelUrl.startsWith('blob:')) {
        URL.revokeObjectURL(modelUrl);
      }
    };
  }, [modelUrl]);

  const loadFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb') && !file.name.toLowerCase().endsWith('.gltf')) {
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setModelUrl((prev) => {
      if (prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return blobUrl;
    });
    setCustomFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const resetDefault = () => {
    setModelUrl((prev) => {
      if (prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return DEFAULT_GLB_PATH;
    });
    setCustomFileName(null);
  };

  return (
    <section
      id="lab3d"
      className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
    >
      <LiquidGlassCard tiltStrength={1.2} className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Controls & Material Optics Spec */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-mono-tech tracking-widest text-cyan-200 uppercase">
              <Box className="h-3.5 w-3.5 text-cyan-300" />
              <span>{content.eyebrow}</span>
            </div>

            <h2 className="leading-tight tracking-tight">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                {content.title}{' '}
              </span>
              <span className="font-serif-editorial prismatic-text text-4xl sm:text-5xl italic font-normal">
                {content.titleEditorial}
              </span>
            </h2>

            <p className="text-sm leading-relaxed text-slate-300/90">
              {content.description}
            </p>

            {/* Optical IOR Presets */}
            <div className="space-y-2 pt-1">
              <p className="font-mono-tech text-[11px] text-slate-400 uppercase tracking-wider">
                Refraction Material Preset
              </p>
              <div className="flex flex-col gap-2">
                {content.presets.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePresetIdx(idx)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 text-left text-xs transition cursor-pointer ${
                      activePresetIdx === idx
                        ? 'border-cyan-300/60 bg-cyan-400/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <span className="font-semibold">{p.label}</span>
                    <span className="font-mono-tech text-[10px] text-cyan-200">
                      CA {p.dispersion.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload / Custom GLB Loader */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <label className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/15 cursor-pointer">
                <Upload className="h-3.5 w-3.5 text-cyan-300" />
                <span>Load Custom .GLB</span>
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>

              {customFileName && (
                <button
                  type="button"
                  onClick={resetDefault}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3.5 py-2 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{content.resetModel}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Interactive 3D WebGL GLB Viewport */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            className={`lg:col-span-7 relative h-[380px] sm:h-[430px] w-full overflow-hidden rounded-[20px] border transition-colors ${
              isDraggingOver
                ? 'border-cyan-300 bg-cyan-400/10'
                : 'border-white/12 bg-[#04060d]/90'
            }`}
          >
            <Canvas
              dpr={[1, 1.75]}
              camera={{ position: [0, 0, 4.2], fov: 42 }}
              className="h-full w-full cursor-grab active:cursor-grabbing"
            >
              <color attach="background" args={['#04060d']} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 6, 5]} intensity={2} />

              {/* Colorful Backlit Chromatic Grid Plane so GLB Refraction Pops Vividly */}
              <mesh position={[0, 0, -2.6]}>
                <planeGeometry args={[9, 6]} />
                <meshBasicMaterial color="#0b132b" />
              </mesh>
              <mesh position={[-1.2, 0.6, -2.2]}>
                <sphereGeometry args={[0.85, 32, 32]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
              <mesh position={[1.25, -0.55, -2.2]}>
                <sphereGeometry args={[0.85, 32, 32]} />
                <meshBasicMaterial color="#c084fc" />
              </mesh>
              <mesh position={[0.1, -0.9, -2.3]}>
                <sphereGeometry args={[0.65, 32, 32]} />
                <meshBasicMaterial color="#fb923c" />
              </mesh>

              <Environment resolution={256} frames={1}>
                <Lightformer
                  intensity={4}
                  position={[0, 4, -4]}
                  scale={[10, 2, 1]}
                  color="#ffffff"
                />
                <Lightformer
                  intensity={3}
                  position={[-5, 0, 2]}
                  scale={[8, 2, 1]}
                  color="#38bdf8"
                />
                <Lightformer
                  intensity={3}
                  position={[5, 0, 2]}
                  scale={[8, 2, 1]}
                  color="#e879f9"
                />
              </Environment>

              <Suspense fallback={null}>
                <RefractiveGLBModel
                  url={modelUrl}
                  ior={preset.ior}
                  dispersion={preset.dispersion}
                  distortion={preset.distortion}
                />
              </Suspense>

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2.4}
                maxDistance={6.5}
                dampingFactor={0.06}
              />
            </Canvas>

            {/* Viewport HUD */}
            <div className="pointer-events-none absolute inset-x-4 bottom-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-tech rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] text-slate-200 backdrop-blur-md">
                {customFileName ? `MODEL // ${customFileName}` : 'MODEL // aumovio-prism.glb'}
              </span>
              <span className="font-mono-tech rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] text-cyan-200 backdrop-blur-md">
                {content.dropHint}
              </span>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </section>
  );
};
