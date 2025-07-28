// Componente del menú lateral. Permite navegar entre secciones y abrir/cerrar el menú tipo hamburguesa.
export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      {/* Botón hamburguesa para abrir/cerrar el menú */}
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-12 right-12 p-3 bg-cyan-400 w-11 h-11 rounded-md"
      >
        {/* Línea superior */}
        <div
          className={`bg-cyan-100 h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        {/* Línea central (se oculta al abrir) */}
        <div
          className={`bg-cyan-100 h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        {/* Línea inferior */}
        <div
          className={`bg-cyan-100 h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      {/* Panel lateral del menú */}
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-cyan-100 transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          {/* Botones de navegación por sección */}
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  );
};

// Botón estilizado para el menú lateral
const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer text-cyan-700 hover:text-cyan-900 transition-colors"
    >
      {label}
    </button>
  );
};
