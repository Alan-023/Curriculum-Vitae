import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motionState } from '../../store/motionState';

interface MorphingLiquidCoreProps {
  highQuality: boolean;
}

const NODE_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#f59e0b', '#f472b6'];

/**
 * Chained 3D Refractive Artifact that transforms continuously with scroll
 * to introduce each scene:
 *  - Hero (0.00-0.20): Asymmetric right-hand Prismatic Torus-Knot Crystal
 *  - Aumovio (0.20-0.46): Unfolds into a 5-Node Distributed Orchestrator Core
 *  - Trajectory & Carousel (0.46-0.78): Tilts into an Anamorphic Optical Lens
 *  - Skills & Contact (0.78-1.00): Converges dead-center as a Singularity Halo
 */
export const MorphingLiquidCore: React.FC<MorphingLiquidCoreProps> = ({ highQuality }) => {
  const rootRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const innerGemRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);
  const transmissionRef = useRef<any>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 4.5;

  const satelliteAngles = useMemo(
    () => Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2),
    []
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = motionState.scrollProgress;
    const px = motionState.pointerX;
    const py = motionState.pointerY;

    const root = rootRef.current;
    if (!root) return;

    // Piecewise smooth choreography across chapters (calibrated to frame negative space cleanly)
    let targetX = isMobile ? 0 : 1.78;
    let targetY = isMobile ? 0.85 : 0.14;
    let targetZ = 0;
    let targetScale = isMobile ? 0.68 : 0.96;
    let ringExpansion = 1.0;
    let satelliteSpread = 0.0; // 0 tucked inside, 1 orbital orchestrator

    if (p < 0.22) {
      // Scene 1 -> 2: Hero crystal sweeps gracefully into Aumovio upper-right Orchestrator space
      const k = THREE.MathUtils.smoothstep(p, 0.04, 0.22);
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 1.78, isMobile ? 0 : 1.65, k);
      targetY = THREE.MathUtils.lerp(isMobile ? 0.85 : 0.16, isMobile ? 0.5 : 0.42, k);
      targetZ = THREE.MathUtils.lerp(0, -0.45, k);
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.68 : 0.96, isMobile ? 0.62 : 0.88, k);
      ringExpansion = THREE.MathUtils.lerp(1.0, 1.36, k);
      satelliteSpread = k;
    } else if (p < 0.52) {
      // Scene 2 -> 3: Aumovio Orchestrator morphs into Horizon Lens above 3D Carousel
      const k = THREE.MathUtils.smoothstep(p, 0.34, 0.52);
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 2.05, 0.0, k);
      targetY = THREE.MathUtils.lerp(isMobile ? 0.5 : 0.42, 0.68, k);
      targetZ = THREE.MathUtils.lerp(-0.45, -1.2, k);
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.62 : 0.88, isMobile ? 0.65 : 1.04, k);
      ringExpansion = THREE.MathUtils.lerp(1.36, 1.58, k);
      satelliteSpread = 1.0 - k * 0.65;
    } else if (p < 0.82) {
      // Scene 3 -> 4: Carousel Lens into Bento Harmonic Core
      const k = THREE.MathUtils.smoothstep(p, 0.56, 0.82);
      targetX = THREE.MathUtils.lerp(0.0, isMobile ? 0 : 1.65, k);
      targetY = THREE.MathUtils.lerp(0.65, -0.15, k);
      targetZ = THREE.MathUtils.lerp(-1.15, -0.95, k);
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.65 : 1.08, isMobile ? 0.58 : 0.86, k);
      ringExpansion = THREE.MathUtils.lerp(1.62, 1.18, k);
      satelliteSpread = 0.35;
    } else {
      // Scene 4 -> 5: Converges center behind Contact Portal
      const k = THREE.MathUtils.smoothstep(p, 0.82, 0.96);
      targetX = THREE.MathUtils.lerp(isMobile ? 0 : 1.65, 0.0, k);
      targetY = THREE.MathUtils.lerp(-0.15, 0.05, k);
      targetZ = THREE.MathUtils.lerp(-0.95, -0.45, k);
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.58 : 0.86, isMobile ? 0.72 : 1.05, k);
      ringExpansion = THREE.MathUtils.lerp(1.18, 1.45, k);
      satelliteSpread = k * 0.75;
    }

    // Smooth pointer parallax coupled to position & tilt
    root.position.x = THREE.MathUtils.lerp(root.position.x, targetX + px * 0.28, dt * 4.2);
    root.position.y = THREE.MathUtils.lerp(root.position.y, targetY + py * 0.22, dt * 4.2);
    root.position.z = THREE.MathUtils.lerp(root.position.z, targetZ, dt * 4.2);

    const s = THREE.MathUtils.lerp(root.scale.x, targetScale, dt * 4.5);
    root.scale.setScalar(s);

    // Chained rotation driven by time + scroll progress + pointer
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.24 + p * Math.PI * 2.2 - py * 0.35;
      knotRef.current.rotation.y = t * 0.32 + p * Math.PI * 3.0 + px * 0.45;
    }

    if (innerGemRef.current) {
      const pulseBoost = motionState.aumovioPulseActive ? 1.32 + Math.sin(t * 14) * 0.12 : 1.0;
      innerGemRef.current.rotation.y = -t * 0.65;
      innerGemRef.current.rotation.z = t * 0.42;
      innerGemRef.current.scale.setScalar(
        THREE.MathUtils.lerp(innerGemRef.current.scale.x, pulseBoost, dt * 8)
      );
    }

    if (ringARef.current && ringBRef.current) {
      ringARef.current.rotation.x = 0.85 + Math.sin(t * 0.4) * 0.25 + p * 2.4;
      ringARef.current.rotation.y = t * 0.35 + px * 0.3;
      ringARef.current.scale.setScalar(
        THREE.MathUtils.lerp(ringARef.current.scale.x, ringExpansion, dt * 4)
      );

      ringBRef.current.rotation.x = -0.75 + Math.cos(t * 0.35) * 0.25 - p * 2.1;
      ringBRef.current.rotation.z = t * 0.28 + py * 0.3;
      ringBRef.current.scale.setScalar(
        THREE.MathUtils.lerp(ringBRef.current.scale.x, ringExpansion * 1.12, dt * 4)
      );
    }

    // Distributed Orchestrator Satellite Nodes
    if (satellitesRef.current) {
      const orbitSpeed = motionState.aumovioPulseActive ? 2.6 : 0.48;
      satellitesRef.current.rotation.z = t * orbitSpeed;
      satellitesRef.current.rotation.x = 0.45 + py * 0.2;

      satellitesRef.current.children.forEach((child, idx) => {
        const angle = satelliteAngles[idx];
        const radius = THREE.MathUtils.lerp(0.45, 1.72, satelliteSpread);
        child.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          Math.sin(t * 1.6 + idx) * 0.22 * satelliteSpread
        );
        const isHovered = motionState.aumovioHoveredNode === idx || motionState.aumovioPulseActive;
        const targetNodeScale = satelliteSpread * (isHovered ? 1.55 : 0.95);
        child.scale.setScalar(
          THREE.MathUtils.lerp(child.scale.x, Math.max(0.001, targetNodeScale), dt * 7)
        );
      });
    }

    // Dynamic rainbow chromatic aberration boost on cursor movement / simulation pulse
    if (transmissionRef.current) {
      const targetAberration =
        0.24 +
        motionState.pointerSpeed * 0.38 +
        (motionState.aumovioPulseActive ? 0.28 : 0);
      transmissionRef.current.chromaticAberration = THREE.MathUtils.lerp(
        transmissionRef.current.chromaticAberration,
        targetAberration,
        dt * 6
      );
    }
  });

  return (
    <group ref={rootRef} position={[1.78, 0.14, 0]}>
      <Float speed={1.8} rotationIntensity={0.22} floatIntensity={0.35}>
        {/* Emissive Inner Quantum Seed (refracted THROUGH the outer Liquid Glass!) */}
        <mesh ref={innerGemRef}>
          <octahedronGeometry args={[0.38, 1]} />
          <meshStandardMaterial
            color="#e0f2fe"
            emissive="#38bdf8"
            emissiveIntensity={1.6}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>

        {/* Primary Sculptural Liquid Glass Torus-Knot */}
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[0.84, 0.26, highQuality ? 160 : 96, highQuality ? 32 : 20, 2, 3]} />
          <MeshTransmissionMaterial
            ref={transmissionRef}
            backside
            backsideThickness={0.38}
            samples={highQuality ? 8 : 4}
            resolution={highQuality ? 512 : 256}
            transmission={1}
            roughness={0.03}
            thickness={0.75}
            ior={1.52}
            chromaticAberration={0.26}
            anisotropy={0.35}
            distortion={0.34}
            distortionScale={0.32}
            temporalDistortion={0.18}
            attenuationDistance={2.2}
            attenuationColor="#e0f2fe"
            color="#ffffff"
          />
        </mesh>

        {/* Gyroscopic Precision Ring Alpha */}
        <mesh ref={ringARef}>
          <torusGeometry args={[1.38, 0.022, 16, 100]} />
          <meshStandardMaterial
            color="#bae6fd"
            emissive="#38bdf8"
            emissiveIntensity={0.75}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Gyroscopic Precision Ring Beta */}
        <mesh ref={ringBRef}>
          <torusGeometry args={[1.54, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#ddd6fe"
            emissive="#818cf8"
            emissiveIntensity={0.65}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* 5 Distributed Orchestrator Satellite Nodes (Aumovio Pipeline Metaphor) */}
        <group ref={satellitesRef}>
          {NODE_COLORS.map((hex, idx) => (
            <mesh key={hex} scale={0.01}>
              <icosahedronGeometry args={[0.11, 1]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive={hex}
                emissiveIntensity={2.1}
                roughness={0.1}
                metalness={0.5}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};
