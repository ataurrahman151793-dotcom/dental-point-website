"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* Single joint: cylinder + sphere cap */
function ArmSegment({
  position,
  rotation,
  length,
  radius,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  radius: number;
  color: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      <mesh position={[0, length / 2, 0]}>
        <sphereGeometry args={[radius * 1.3, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.95}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

/* Animated robot arm — joints rotate with scroll progress */
function RobotArm({ scrollProgress }: { scrollProgress: number }) {
  const baseRef = useRef<THREE.Group>(null);
  const arm1Ref = useRef<THREE.Group>(null);
  const arm2Ref = useRef<THREE.Group>(null);
  const arm3Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgress;

    if (baseRef.current) {
      baseRef.current.rotation.y = t * 0.3 + p * Math.PI * 0.5;
    }
    if (arm1Ref.current) {
      arm1Ref.current.rotation.z = -0.3 + p * 0.6;
    }
    if (arm2Ref.current) {
      arm2Ref.current.rotation.z = 0.2 - p * 0.8;
    }
    if (arm3Ref.current) {
      arm3Ref.current.rotation.z = -0.1 + p * 0.4;
      arm3Ref.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  const silver = "#C8CDD0";
  const dark = "#1A2421";

  return (
    <group>
      {/* Base platform */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.3, 32]} />
        <meshPhysicalMaterial color={dark} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Main arm structure */}
      <group ref={baseRef} position={[0, -2.35, 0]}>
        {/* Vertical base pillar */}
        <ArmSegment
          position={[0, 0.6, 0]}
          rotation={[0, 0, 0]}
          length={1.2}
          radius={0.18}
          color={silver}
        />

        {/* Arm 1 */}
        <group ref={arm1Ref} position={[0, 1.2, 0]}>
          <ArmSegment
            position={[0.5, 0.4, 0]}
            rotation={[0, 0, -0.6]}
            length={1}
            radius={0.14}
            color={silver}
          />

          {/* Arm 2 */}
          <group ref={arm2Ref} position={[0.85, 1, 0]}>
            <ArmSegment
              position={[0.4, 0.3, 0]}
              rotation={[0, 0, -0.4]}
              length={0.9}
              radius={0.11}
              color={silver}
            />

            {/* Arm 3 — end effector */}
            <group ref={arm3Ref} position={[0.7, 0.8, 0]}>
              <ArmSegment
                position={[0, 0.25, 0]}
                rotation={[0, 0, 0]}
                length={0.5}
                radius={0.08}
                color={silver}
              />
              {/* Drill tip */}
              <mesh position={[0, 0.6, 0]}>
                <coneGeometry args={[0.05, 0.3, 8]} />
                <meshPhysicalMaterial
                  color="#D8B589"
                  roughness={0.02}
                  metalness={1}
                />
              </mesh>
              {/* Indicator light */}
              <pointLight position={[0, 0.6, 0]} intensity={3} color="#00ff88" distance={2} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

interface YomiArmProps {
  scrollProgress?: number;
}

export default function YomiArm({ scrollProgress = 0 }: YomiArmProps) {
  return (
    <Canvas
      camera={{ position: [3, 2, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
      className="r3f-canvas"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      <pointLight position={[-5, 5, 0]} intensity={0.8} color="#C8E0D6" />
      <Environment preset="city" />

      <RobotArm scrollProgress={scrollProgress} />

      <ContactShadows
        position={[0, -2.65, 0]}
        opacity={0.5}
        scale={8}
        blur={2.5}
        color="#2F5D52"
      />
    </Canvas>
  );
}
