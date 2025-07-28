// Componente de fondo animado: esfera gigante que cambia de color según el scroll
import { Sphere, useScroll } from "@react-three/drei"; // Esfera 3D y hook de scroll
import { useFrame } from "@react-three/fiber"; // Hook para animaciones por frame
import { gsap } from "gsap"; // Librería de animaciones
import { useEffect, useRef } from "react"; // Hooks de React
import * as THREE from "three"; // Motor 3D base

export const Background = () => {
  // Referencia al material de la esfera
  const material = useRef();
  // Objeto reactivo para el color animado
  const color = useRef({
    color: "#0e7490", // cyan-700 (Skills, más oscuro)
  });
  // Hook para obtener el estado del scroll
  const data = useScroll();

  // Referencia al timeline de GSAP
  const tl = useRef();

  // useFrame: se ejecuta en cada frame de la animación
  useFrame(() => {
    // Sincroniza el progreso del timeline con el scroll
    tl.current.progress(data.scroll.current);
    // Actualiza el color del material de la esfera
    material.current.color = new THREE.Color(color.current.color);
  });

  // useEffect: inicializa el timeline de GSAP al montar el componente
  useEffect(() => {
    tl.current = gsap.timeline();
    // Primer tramo: color más oscuro (Skills)
    tl.current.to(color.current, {
      color: "#22d3ee", // cyan-400 (Sección 3, más claro)
    });
    // Segundo tramo: color muy claro (última sección)
    tl.current.to(color.current, {
      color: "#a5f3fc", // cyan-200 (Última sección, muy claro)
    });
  }, []);

  return (
    <group>
      {/* Esfera gigante invertida que envuelve la escena */}
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
