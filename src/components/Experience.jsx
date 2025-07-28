// Componente principal de la experiencia 3D, controla la escena, cámara, animaciones y transiciones visuales.
// Importación de utilidades de Drei y Fiber para animaciones y geometría
import {
  Float, // Componente para animar objetos flotando
  MeshDistortMaterial, // Material que distorsiona la malla (usado en esferas)
  MeshWobbleMaterial, // Material que deforma la malla (usado en caja)
  useScroll, // Hook para obtener el estado del scroll
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"; // Hooks de R3F para controlar el render y la cámara
import { animate, useMotionValue } from "framer-motion"; // Animaciones reactivas
import { motion } from "framer-motion-3d"; // Animaciones 3D
import { useEffect, useRef, useState } from "react"; // Hooks de React
import { framerMotionConfig } from "../config"; // Configuración de animaciones
import { Avatar } from "./Avatar"; // Componente del avatar animado
import { Background } from "./Background"; // Fondo animado
import { Office } from "./Office"; // Oficina 3D
import { Projects } from "./Projects"; // Sección de proyectos

export const Experience = (props) => {
  const { menuOpened } = props; // Estado del menú lateral
  const { viewport } = useThree(); // Dimensiones del viewport 3D
  const data = useScroll(); // Estado del scroll

  const [section, setSection] = useState(0); // Sección actual (0: inicio, 1: about, etc)

  // Valores animados para la posición y el lookAt de la cámara
  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue(0);

  // Efecto para animar la cámara cuando se abre/cierra el menú
  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef(); // Ref para el spot del personaje

  const [characterAnimation, setCharacterAnimation] = useState("Typing"); // Animación actual del avatar
  const lastSection = useRef(section); // Última sección para detectar cambios

  // Efecto para cambiar la animación del avatar según la sección y el scroll
  useEffect(() => {
    // Solo aplica "Falling" si el cambio es entre la sección 0 y 1 (en cualquier dirección)
    if (
      (lastSection.current === 0 && section === 1) ||
      (lastSection.current === 1 && section === 0)
    ) {
      setCharacterAnimation("Falling");
      const timeout = setTimeout(() => {
        setCharacterAnimation(section === 0 ? "Typing" : "Standing");
      }, 600); // Duración de la animación "Falling"
      lastSection.current = section;
      return () => clearTimeout(timeout);
    } else {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
      lastSection.current = section;
    }
  }, [section]);

  // useFrame se ejecuta en cada frame de la animación
  useFrame((state) => {
    // Calcula la sección actual según el scroll
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    // Actualiza la posición y dirección de la cámara según el menú
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      {/* Fondo animado (esfera gigante) */}
      <Background />
      {/* Grupo principal con el avatar, animado según la sección */}
      <motion.group
        position={[1.9072935059634513, 0.14400000000000002, 2.681801948466054]}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: 0.9,
            scaleY: 0.9,
            scaleZ: 0.9,
          },
          1: {
            y: -viewport.height + 0.5,
            x: 0,
            z: 7,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          2: {
            x: -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.3,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
          },
        }}
      >
        {/* Avatar 3D con animación controlada por el estado */}
        <Avatar animation={characterAnimation} />
      </motion.group>
      {/* Luz ambiental general */}
      <ambientLight intensity={1} />
      {/* Grupo para la oficina y el spot del personaje */}
      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >
        {/* Oficina 3D, recibe la sección actual */}
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>

      {/* SKILLS: Figuras geométricas animadas y luces para la sección de habilidades */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        {/* Luz direccional para resaltar las figuras */}
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        {/* Esfera azul animada */}
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color="#0ea5e9" // sky-500 (más oscuro)
            />
          </mesh>
        </Float>
        {/* Esfera cyan animada */}
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="#0891b2" // cyan-600 (más oscuro)
            />
          </mesh>
        </Float>
        {/* Cubo verde animado */}
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color="#059669" // emerald-700 (más oscuro)
            />
          </mesh>
        </Float>
      </motion.group>
      {/* Proyectos 3D, siempre visibles */}
      <Projects />
    </>
  );
};
