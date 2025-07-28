// Componente ScrollManager: sincroniza el scroll físico con el estado de la sección y viceversa
import { useScroll } from "@react-three/drei"; // Hook para obtener el estado del scroll
import { useFrame } from "@react-three/fiber"; // Hook para animaciones por frame
import { gsap } from "gsap"; // Librería de animaciones
import { useEffect, useRef } from "react"; // Hooks de React

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props; // Estado y setter de la sección

  const data = useScroll(); // Objeto de scroll de drei
  const lastScroll = useRef(0); // Última posición de scroll
  const isAnimating = useRef(false); // Flag para saber si hay animación de scroll en curso

  // Ajusta el estilo del fill para que cubra la pantalla
  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  // Efecto: cuando cambia la sección, anima el scroll físico hasta la sección correspondiente
  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  // useFrame: detecta el scroll manual y actualiza la sección si corresponde
  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    // Si el usuario hace scroll hacia abajo desde la sección 0, pasa a la 1
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      onSectionChange(1);
    }
    // Si el usuario hace scroll hacia arriba y está al inicio, vuelve a la 0
    if (
      data.scroll.current < lastScroll.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    lastScroll.current = data.scroll.current;
  });

  return null; // No renderiza nada
};
