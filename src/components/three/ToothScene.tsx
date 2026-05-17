"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Sparkles,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Procedural tooth shape: rounded cube morphed into a tooth silhouette */
function ToothGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Auto rotate + mouse influence
    meshRef.current.rotation.y = t * 0.3 + mouse.x * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.y * 0.2;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Crown: rounded box for the main body */}
      <boxGeometry args={[1.4, 1.8, 1.2, 8, 8, 8]} />
      <meshPhysicalMaterial
        color="#F8F5F0"
        roughness={0.05}
        metalness={0.0}
        transmission={0.3}
        thickness={1.5}
        ior={1.4}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2}
      />
    </mesh>
  );
}

/* Root 1 */
function Root1() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <mesh ref={ref} position={[-0.35, -1.5, 0]} rotation={[0.2, 0, -0.15]}>
      <coneGeometry args={[0.28, 1.2, 8]} />
      <meshPhysicalMaterial
        color="#F0EDE8"
        roughness={0.08}
        metalness={0}
        transmission={0.2}
        thickness={1}
        ior={1.4}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function Root2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <mesh ref={ref} position={[0.35, -1.5, 0]} rotation={[0.2, 0, 0.15]}>
      <coneGeometry args={[0.28, 1.2, 8]} />
      <meshPhysicalMaterial
        color="#F0EDE8"
        roughness={0.08}
        metalness={0}
        transmission={0.2}
        thickness={1}
        ior={1.4}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function SceneContent() {
  const reducedMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.25 + mouse.x * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#C8E0D6" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#D8B589" />

      <Environment preset="studio" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <group ref={groupRef}>
          <ToothGeometry />
          <Root1 />
          <Root2 />
        </group>
      </Float>

      <Sparkles
        count={60}
        scale={5}
        size={1.5}
        speed={0.4}
        opacity={0.6}
        color="#C8E0D6"
      />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={6}
        blur={2}
        far={4}
        color="#2F5D52"
      />
    </>
  );
}

export default function ToothScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
      className="r3f-canvas"
    >
      <SceneContent />
    </Canvas>
  );
}
