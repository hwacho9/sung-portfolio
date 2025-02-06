"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

function Duck({}: { scrollY: number }) {
  const gltf = useLoader(GLTFLoader, "/assets/3d/Duck.glb");
  const duckRef = useRef<THREE.Group>(null!);
  const { mouse, camera } = useThree();
  const [isJumping, setIsJumping] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const jumpHeight = 0.5;
  const jumpDuration = 500; // ms
  const clickDuration = 150; // ms

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isJumping) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), jumpDuration);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), clickDuration);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isJumping]);

  useFrame(() => {
    if (duckRef.current) {
      // Calculate world position for mouse
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Set duck position
      duckRef.current.position.x = pos.x;
      duckRef.current.position.y = pos.y + 0.5; // Offset slightly above cursor

      // Add jump effect
      if (isJumping) {
        const jumpProgress = (Date.now() % jumpDuration) / jumpDuration;
        const jumpOffset = Math.sin(jumpProgress * Math.PI) * jumpHeight;
        duckRef.current.position.y += jumpOffset;
      }

      // Rotate the duck
      duckRef.current.rotation.y += 0.02; // Continuous rotation

      // Tilt the duck based on mouse position
      const tiltX = (mouse.y * Math.PI) / 8;
      const tiltZ = (-mouse.x * Math.PI) / 8;
      duckRef.current.rotation.x = tiltX;
      duckRef.current.rotation.z = tiltZ;

      // Click effect
      if (isClicked) {
        const clickProgress = (Date.now() % clickDuration) / clickDuration;
        const scaleFactor = 0.8 + 0.2 * Math.sin(clickProgress * Math.PI);
        duckRef.current.scale.set(
          0.4 * scaleFactor,
          0.4 * scaleFactor,
          0.4 * scaleFactor
        );
      } else {
        duckRef.current.scale.set(0.4, 0.4, 0.4);
      }
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={duckRef}
      scale={[0.4, 0.4, 0.4]} // Adjust scale as needed
    />
  );
}

interface ThreeSceneProps {
  scrollY: number;
}

export default function ThreeScene({ scrollY }: ThreeSceneProps) {
  return (
    <Canvas className="h-screen" camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Duck scrollY={scrollY} />
    </Canvas>
  );
}
