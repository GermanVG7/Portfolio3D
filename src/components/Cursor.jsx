// Componente de cursor personalizado que sigue el mouse y cambia de estilo al pasar sobre botones o inputs
import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08; // Velocidad de interpolación del cursor

// Variables globales para la posición del mouse y del cursor
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  // Referencia al div del cursor
  const cursorOutline = useRef();
  // Estado para saber si el cursor está sobre un botón/input
  const [hoverButton, setHoverButton] = useState(false);

  // Función de animación: interpola la posición del cursor hacia el mouse
  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    cursorOutline.current.style.left = `${outlineX}px`;
    cursorOutline.current.style.top = `${outlineY}px`;
    requestAnimationFrame(animate);
  };

  // Efecto para escuchar el movimiento del mouse y animar el cursor
  useEffect(() => {
    const mouseEventsListener = document.addEventListener(
      "mousemove",
      function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
      }
    );
    const animateEvent = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  // Efecto para detectar si el mouse está sobre un botón, input o textarea
  useEffect(() => {
    const mouseEventListener = document.addEventListener(
      "mouseover",
      function (e) {
        if (
          e.target.tagName.toLowerCase() === "button" ||
          // check parent is button
          e.target.parentElement.tagName.toLowerCase() === "button" ||
          // check is input or textarea
          e.target.tagName.toLowerCase() === "input" ||
          e.target.tagName.toLowerCase() === "textarea"
        ) {
          setHoverButton(true);
        } else {
          setHoverButton(false);
        }
      }
    );
    return () => {
      document.removeEventListener("mouseover", mouseEventListener);
    };
  }, []);

  return (
    <>
      {/* Div que representa el cursor personalizado. Cambia de tamaño y color al pasar sobre botones/inputs */}
      <div
        className={`z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform
        ${
          hoverButton
            ? "bg-transparent border-2 border-cyan-800 w-5 h-5"
            : "bg-cyan-200 w-3 h-3"
        }`}
        ref={cursorOutline}
      ></div>
    </>
  );
};
