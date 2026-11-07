import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motionState } from '../../store/motionState';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uVelocity;
  uniform float uScroll;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Smooth trigonometric fluid flow field
  float waveField(vec2 p, float t) {
    float v = 0.0;
    v += sin((p.x * 2.1 + t * 0.35) + cos(p.y * 1.9 - t * 0.28));
    v += 0.55 * sin((p.y * 3.4 - t * 0.42) + sin(p.x * 2.7 + t * 0.31));
    v += 0.32 * cos((p.x - p.y) * 4.2 + t * 0.5);
    return v / 1.87;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;

    vec2 mouse = uPointer * vec2(aspect, 1.0);
    float distToMouse = length(p - mouse);

    // Cursor fluid ripple displacement
    float ripple = exp(-distToMouse * 2.1) * (0.24 + uVelocity * 0.45);
    vec2 warped = p + normalize(p - mouse + 0.0001) * ripple * sin(distToMouse * 7.0 - uTime * 3.2) * 0.18;

    // Scroll shifts harmonic phase smoothly across chapters
    float phase = uScroll * 3.6;
    float f1 = waveField(warped * 1.15 + vec2(0.0, phase * 0.35), uTime);
    float f2 = waveField(warped * 1.85 - vec2(phase * 0.25, 0.0), uTime * 1.2 + 1.7);

    // Base deep obsidian space
    vec3 col = vec3(0.012, 0.016, 0.030);

    // Luminous caustic ribbons (gives MeshTransmissionMaterial vivid light to refract!)
    float ribbonA = smoothstep(0.18, 0.88, f1 * 0.5 + 0.5);
    float ribbonB = smoothstep(0.28, 0.92, f2 * 0.5 + 0.5);
    float causticLine = pow(max(0.0, 1.0 - abs(f1 - f2) * 2.6), 4.5);

    vec3 cyanOptical = vec3(0.08, 0.52, 0.82);
    vec3 indigoDeep = vec3(0.22, 0.18, 0.62);
    vec3 warmPrism = vec3(0.82, 0.42, 0.18);
    vec3 emeraldPulse = vec3(0.08, 0.62, 0.48);

    // Blend chapter mood subtly with scroll
    vec3 chapterTint = mix(cyanOptical, emeraldPulse, smoothstep(0.18, 0.45, uScroll));
    chapterTint = mix(chapterTint, warmPrism, smoothstep(0.50, 0.78, uScroll) * 0.55);

    col += chapterTint * ribbonA * 0.22;
    col += indigoDeep * ribbonB * 0.24;
    col += mix(vec3(0.55, 0.85, 1.0), vec3(1.0, 0.72, 0.86), uv.x) * causticLine * 0.32;

    // Cursor chromatic aura behind glass
    float cursorGlow = exp(-distToMouse * 1.85);
    col += vec3(0.16, 0.62, 0.95) * cursorGlow * (0.18 + uVelocity * 0.22);
    col += vec3(0.72, 0.34, 0.88) * exp(-length(p - mouse * 0.82) * 2.3) * 0.11;

    // Gentle vignette to keep edges ultra-clean
    float vig = 1.0 - smoothstep(0.65, 1.95, length(p * vec2(0.75, 1.0)));
    col *= (0.55 + 0.45 * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const ReactiveShaderBackdrop: React.FC = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const smoothScroll = useRef(0);
  const smoothVel = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
    }),
    []
  );

  useFrame((state, delta) => {
    const mat = matRef.current;
    if (!mat) return;

    const dt = Math.min(delta, 0.05);
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uResolution.value.set(size.width, size.height);

    smoothPointer.current.x = THREE.MathUtils.lerp(
      smoothPointer.current.x,
      motionState.pointerX,
      dt * 5.5
    );
    smoothPointer.current.y = THREE.MathUtils.lerp(
      smoothPointer.current.y,
      motionState.pointerY,
      dt * 5.5
    );
    smoothScroll.current = THREE.MathUtils.lerp(
      smoothScroll.current,
      motionState.scrollProgress,
      dt * 6.0
    );
    smoothVel.current = THREE.MathUtils.lerp(
      smoothVel.current,
      motionState.pointerSpeed + Math.min(Math.abs(motionState.scrollVelocity) * 0.015, 0.6),
      dt * 7.0
    );

    mat.uniforms.uPointer.value.copy(smoothPointer.current);
    mat.uniforms.uScroll.value = smoothScroll.current;
    mat.uniforms.uVelocity.value = smoothVel.current;
  });

  // Position plane at z = -4.5 and scale to fill camera frustum at that depth
  const scaleFactor = 2.15;

  return (
    <mesh position={[0, 0, -4.5]} scale={[viewport.width * scaleFactor, viewport.height * scaleFactor, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};
