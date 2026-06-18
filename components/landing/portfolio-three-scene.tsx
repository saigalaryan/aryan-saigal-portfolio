"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color } from "three";

function CoreShape() {
  const groupRef = useRef<Group>(null);
  const torusRef = useRef<Mesh>(null);
  const boxRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.22;
      groupRef.current.rotation.x = Math.sin(time * 0.35) * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.45;
      torusRef.current.rotation.z = time * 0.28;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.3;
      boxRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[1.8, 0.15, -1.4]}>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1.02, 0.18, 96, 12]} />
        <meshStandardMaterial color="#111111" roughness={0.36} metalness={0.2} />
      </mesh>
      <mesh ref={boxRef} scale={0.9}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#f4f0e7" roughness={0.18} metalness={0.08} wireframe />
      </mesh>
      <mesh position={[-1.6, -1.05, 0.3]} scale={0.42}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#111111" roughness={0.25} />
      </mesh>
      <mesh position={[1.2, 1.1, 0.15]} scale={0.22}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#d7ff66" emissive="#d7ff66" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<Points>(null);
  const geometry = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = ["#111111", "#737373", "#d7ff66", "#f4f0e7"].map((hex) => new Color(hex));

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new BufferAttribute(colors, 3));
    return bufferGeometry;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.58}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function PortfolioThreeScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 48 }} dpr={[1, 1.25]}>
        <color attach="background" args={["#f7f4ec"]} />
        <ambientLight intensity={1.9} />
        <directionalLight position={[4, 4, 4]} intensity={1.4} />
        <pointLight position={[-3, -2, 2]} intensity={1.4} color="#d7ff66" />
        <ParticleField />
        <CoreShape />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,transparent_0,rgba(247,244,236,0.08)_20%,rgba(247,244,236,0.9)_56%,#f7f4ec_100%)]" />
    </div>
  );
}
