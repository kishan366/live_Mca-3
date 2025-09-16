// src/pages/RefreshPage.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

function WebGLGuard({ children }) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setOk(!!gl);
    } catch {
      setOk(false);
    }
  }, []);
  if (!ok) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        <div>
          <h2 className="text-lg font-semibold">WebGL उपलब्ध नहीं</h2>
          <p className="opacity-80">ब्राउज़र/हार्डवेयर acceleration चेक करें।</p>
        </div>
      </div>
    );
  }
  return children;
}

function WobblingBox() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.x = t;
      ref.current.rotation.y = t * 1.3;
      ref.current.scale.set(
        1 + 0.2 * Math.sin(t * 2),
        1 + 0.2 * Math.cos(t * 2),
        1 + 0.2 * Math.sin(t * 3)
      );
      ref.current.position.y = 0.3 * Math.sin(t * 2);
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#ff00ff"
        emissive="#ff00ff"
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.7}
      />
    </mesh>
  );
}

export default function RefreshPage() {
  return (
    <div className="w-full h-screen" style={{ background: "#000" }}>
      <WebGLGuard>
        <Canvas camera={{ position: [3, 2, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <WobblingBox />
        </Canvas>
      </WebGLGuard>
    </div>
  );
}
