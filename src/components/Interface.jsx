// Componente de interfaz HTML superpuesta al canvas 3D. Incluye las secciones: About, Skills, Projects y Contact.
import { motion } from "framer-motion"; // Animaciones para la interfaz
import { useAtom } from "jotai"; // Estado global para proyectos
import { currentProjectAtom, projects } from "./Projects"; // Datos de proyectos

// Componente de sección animada, reutilizable para cada bloque de la interfaz
const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

// Componente principal de la interfaz. Renderiza todas las secciones.
export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

// Sección de presentación personal
const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug text-teal-100">
        Hi, my name is
        <br />
        <span className="bg-teal-100 px-1 italic text-teal-700">Germán Villar</span>
      </h1>
      <motion.p
        className="text-lg text-teal-200 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I'm a software developer very motivated to learn <br /> and develop in this sector.
      </motion.p>
      {/* Botón para saltar a la sección de contacto */}
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-cyan-500 text-teal-100 py-4 px-8 rounded-lg font-bold text-lg mt-16 hover:bg-cyan-400 transition-colors`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

// Datos de habilidades y lenguajes
const skills = [
  {
    title: "Java",
    level: 65,
  },
  {
    title: "Javascript",
    level: 30,
  },
  {
    title: "html/css",
    level: 60,
  },
  {
    title: "MySQL",
    level: 45,
  },

];
const languages = [
  {
    title: "Spanish",
    level: 100,
  },
  {
    title: "English",
    level: 70,
  },
  {
    title: "Hebrew",
    level: 40,
  },
  {
    title: "French",
    level: 10,
  },
];

// Sección de habilidades y lenguajes
const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold text-teal-200">Skills</h2>
        <div className=" mt-8 space-y-4">
          {/* Barra de progreso para cada habilidad */}
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-cyan-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-white rounded-full mt-2">
                <motion.div
                  className="h-full bg-cyan-700 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-5xl font-bold mt-10 text-teal-200">Languages</h2>
          <div className=" mt-8 space-y-4">
            {/* Barra de progreso para cada idioma */}
            {languages.map((lng, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  className="text-xl font-bold text-cyan-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-white rounded-full mt-2">
                  <motion.div
                    className="h-full bg-cyan-700 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

// Sección de proyectos, permite navegar entre ellos
const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  // Avanza al siguiente proyecto
  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  // Retrocede al proyecto anterior
  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full text-teal-900 gap-8 items-center justify-center">
        {/* Botón para ir al proyecto anterior */}
        <button
          className="hover:text-teal-700 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-5xl font-bold">Projects</h2>
        {/* Botón para ir al siguiente proyecto */}
        <button
          className="hover:text-teal-700 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

// Sección de contacto con formulario
const ContactSection = () => {
  return (
    <Section>
      <h2 className="text-5xl text-teal-700 font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-teal-100 w-96 max-w-full">
        <form>
          {/* Campo nombre */}
          <label htmlFor="name" className="font-medium text-teal-700 block mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
          />
          {/* Campo email */}
          <label
            htmlFor="email"
            className="font-medium text-teal-700 block mb-1 mt-8"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
          />
          {/* Campo mensaje */}
          <label
            htmlFor="email"
            className="font-medium text-teal-700 block mb-1 mt-8"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
          />
          {/* Botón de envío */}
          <button className="bg-teal-700 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 hover:bg-teal-900 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
};
