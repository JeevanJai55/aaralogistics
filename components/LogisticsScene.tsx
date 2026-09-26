'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

type SceneProps = { progress: number; mode?: 'hero' | 'network' };


function SceneCamera({ progress, network }: { progress: number; network: boolean }) {
  useFrame(({ camera }) => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const base = network ? new THREE.Vector3(8.4, 6.4, 10.8) : new THREE.Vector3(8.2, 5.7, 10.3);
    const target = network ? new THREE.Vector3(0, 0.5, 0) : new THREE.Vector3(0, 0.8, 0);
    const swirl = Math.sin(p * Math.PI) * (network ? 2.1 : 1.25);
    const desired = new THREE.Vector3(
      base.x + swirl,
      base.y - p * (network ? 1.15 : 0.7),
      base.z - p * (network ? 2.4 : 1.7),
    );
    camera.position.lerp(desired, 0.065);
    camera.lookAt(target.x + Math.sin(p * Math.PI * 2) * 0.25, target.y, target.z);
  });
  return null;
}

function Container({ position, rotation = 0, accent = false, scale = 1 }: { position: [number, number, number]; rotation?: number; accent?: boolean; scale?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.9, 1.45, 1.45]} />
        <meshStandardMaterial color={accent ? '#ffd21a' : '#0d4f86'} roughness={0.78} metalness={0.12} />
      </mesh>
      {[-1, -0.55, -0.1, 0.35, 0.8].map((x) => (
        <mesh key={x} position={[x, 0, 0.73]}>
          <boxGeometry args={[0.06, 1.18, 0.03]} />
          <meshStandardMaterial color="#04182b" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0.745]}>
        <boxGeometry args={[1.9, 0.16, 0.035]} />
        <meshStandardMaterial color="#04182b" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.52, 0.72]}>
        <boxGeometry args={[2.55, 0.09, 0.035]} />
        <meshStandardMaterial color={accent ? '#04182b' : '#7ea2bf'} />
      </mesh>
    </group>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 2.7;
  });

  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
      <meshStandardMaterial color="#02111f" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function Truck({ progress, network = false }: { progress: number; network?: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const cabRef = useRef<THREE.Group>(null);

  const route = useMemo(() => {
    const points = network
      ? [
          new THREE.Vector3(-4.5, 0.08, 3),
          new THREE.Vector3(-2.2, 0.08, 0.2),
          new THREE.Vector3(0, 0.08, -2),
          new THREE.Vector3(2.1, 0.08, -1),
          new THREE.Vector3(4.3, 0.08, 2.6),
        ]
      : [
          new THREE.Vector3(-3.8, 0.08, 2.8),
          new THREE.Vector3(-1.8, 0.08, 0.7),
          new THREE.Vector3(0.8, 0.08, -1.4),
          new THREE.Vector3(3.8, 0.08, -2.1),
        ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.8);
  }, [network]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = THREE.MathUtils.clamp((progress * 0.94 + (network ? 0.04 : 0)) % 1, 0, 0.999);
    const p = route.getPointAt(t);
    const ahead = route.getPointAt(Math.min(t + 0.012, 0.999));
    ref.current.position.copy(p);
    ref.current.position.y += Math.sin(clock.elapsedTime * 4.5) * 0.018;
    ref.current.rotation.y = Math.atan2(ahead.x - p.x, ahead.z - p.z);
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 2.5) * 0.008;
    if (cabRef.current) cabRef.current.rotation.x = Math.sin(clock.elapsedTime * 5.2) * 0.008;
  });

  return (
    <group ref={ref} scale={network ? 0.68 : 0.78}>
      <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.38, 1.38]} />
        <meshStandardMaterial color="#072442" roughness={0.78} />
      </mesh>
      <group ref={cabRef}>
        <mesh position={[1.72, 1.25, 0]} castShadow>
          <boxGeometry args={[1.55, 1.75, 1.32]} />
          <meshStandardMaterial color="#ffd21a" roughness={0.78} metalness={0.08} />
        </mesh>
        <mesh position={[2.13, 1.52, 0]}>
          <boxGeometry args={[0.52, 0.58, 1.22]} />
          <meshStandardMaterial color="#04182b" roughness={0.95} />
        </mesh>
        <mesh position={[2.52, 0.98, 0]}>
          <boxGeometry args={[0.18, 0.5, 1.1]} />
          <meshStandardMaterial color="#0d4f86" emissive="#0d4f86" emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[2.52, 1.58, 0.47]}>
          <sphereGeometry args={[0.07, 16, 8]} />
          <meshStandardMaterial color="#ffd21a" emissive="#ffd21a" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[2.52, 1.58, -0.47]}>
          <sphereGeometry args={[0.07, 16, 8]} />
          <meshStandardMaterial color="#ffd21a" emissive="#ffd21a" emissiveIntensity={1.8} />
        </mesh>
      </group>
      <Container position={[-0.05, 1.3, 0]} accent scale={1.0} />
      <Wheel position={[-1.05, 0.45, 0.76]} />
      <Wheel position={[1.0, 0.45, 0.76]} />
      <Wheel position={[-1.05, 0.45, -0.76]} />
      <Wheel position={[1.0, 0.45, -0.76]} />
    </group>
  );
}

function Yard({ progress, network }: { progress: number; network?: boolean }) {
  const containers = useMemo(() => {
    const items: { position: [number, number, number]; rotation: number; accent: boolean; scale: number }[] = [];
    const rows = network ? 3 : 4;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < 4; j++) {
        const x = -5 + i * 3.2;
        const z = -3.8 + j * 2.3;
        items.push({ position: [x, 0.78 + (j % 3 === 0 ? 0.75 : 0), z], rotation: (i % 2 ? 0.08 : -0.05), accent: (i === 1 && j === 1) || (i === 2 && j === 3), scale: 1 - i * 0.03 });
      }
    }
    return items;
  }, [network]);

  return (
    <group position={[0, 0, -0.2]} rotation={[0, 0, 0]}>
      {containers.map((item, idx) => (
        <Container key={idx} {...item} />
      ))}
      <gridHelper args={[22, 22, '#2c5a7c', '#0a2742']} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#031426" roughness={0.98} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[12, 1.1]} />
        <meshStandardMaterial color="#0a2742" roughness={0.9} />
      </mesh>
      {[-3.7, 0, 3.7].map((z) => (
        <group key={z} position={[0, 0.015, z]}>
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={i} position={[-5.5 + i, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.55, 0.06]} />
              <meshBasicMaterial color="#ffd21a" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      ))}
      <Sparkles count={network ? 75 : 110} scale={[16, 5, 14]} size={2.2} speed={0.3} color="#ffd21a" noise={1.2} opacity={0.35} />
    </group>
  );
}

export default function LogisticsScene({ progress, mode = 'hero' }: SceneProps) {
  const network = mode === 'network';
  const cameraTarget = network ? new THREE.Vector3(0, 0.65, 0) : new THREE.Vector3(0, 0.9, 0);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: network ? [8, 7.2, 11] : [8.4, 5.9, 10.5], fov: network ? 42 : 38 }}
      onCreated={({ camera }) => camera.lookAt(cameraTarget)}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#031426']} />
      <fog attach="fog" args={['#031426', 12, 28]} />
      <SceneCamera progress={progress} network={network} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 9, 6]} intensity={3.1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-5, 3, 2]} intensity={18} distance={14} color="#ffd21a" />
      <pointLight position={[6, 4, -4]} intensity={10} distance={18} color="#9bc2df" />
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.1}>
        <Yard progress={progress} network={network} />
        <Truck progress={progress + 0.1} network={network} />
      </Float>
      {network && (
        <Line points={[
          [-4.5, 0.08, 3], [-2.2, 0.08, 0.2], [0, 0.08, -2], [2.1, 0.08, -1], [4.3, 0.08, 2.6],
        ]} color="#ffd21a" lineWidth={2} dashed dashScale={4.5} dashSize={0.7} gapSize={0.55} />
      )}
      <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={18} blur={2.8} far={12} />
    </Canvas>
  );
}
