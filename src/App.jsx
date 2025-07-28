// Componente principal de la aplicación. Orquesta la escena 3D, la interfaz y el menú lateral.
import { Scroll, ScrollControls } from "@react-three/drei"; // Scroll y controles de páginas para R3F
import { Canvas } from "@react-three/fiber"; // Lienzo 3D de React Three Fiber
import { MotionConfig } from "framer-motion"; // Configuración global de animaciones
import { Leva } from "leva"; // Panel de control para debug (oculto en producción)
import { useEffect, useState } from "react"; // Hooks de React
import { Cursor } from "./components/Cursor"; // Cursor personalizado
import { Experience } from "./components/Experience"; // Escena 3D principal
import { Interface } from "./components/Interface"; // Interfaz HTML (formularios, textos)
import { Menu } from "./components/Menu"; // Menú lateral
import { ScrollManager } from "./components/ScrollManager"; // Gestor de scroll y secciones
import { framerMotionConfig } from "./config"; // Configuración de animaciones

function App() {
  // Estado de la sección actual (0: inicio, 1: about, etc)
  const [section, setSection] = useState(0);
  // Estado de apertura del menú lateral
  const [menuOpened, setMenuOpened] = useState(false);

  // Cierra el menú automáticamente al cambiar de sección
  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      {/* Configuración global de animaciones */}
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        {/* Lienzo 3D principal */}
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
          {/* Color de fondo global */}
          <color attach="background" args={["#e6e7ff"]} />
          {/* Controles de scroll para navegación por secciones */}
          <ScrollControls pages={4} damping={0.1}>
            {/* Gestor de scroll: detecta y actualiza la sección visible */}
            <ScrollManager section={section} onSectionChange={setSection} />
            {/* Contenido 3D que se mueve con el scroll */}
            <Scroll>
              <Experience section={section} menuOpened={menuOpened} />
            </Scroll>
            {/* Contenido HTML (interfaz) que se mueve con el scroll */}
            <Scroll html>
              <Interface setSection={setSection} />
            </Scroll>
          </ScrollControls>
        </Canvas>
        {/* Menú lateral, se muestra sobre el canvas */}
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        {/* Cursor personalizado */}
        <Cursor />
      </MotionConfig>
      {/* Panel de control de Leva (oculto) */}
      <Leva hidden />
    </>
  );
}

export default App;
