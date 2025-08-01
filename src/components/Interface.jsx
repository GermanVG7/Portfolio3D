// Componente de interfaz HTML superpuesta al canvas 3D. Incluye las secciones: About, Skills, Projects y Contact.
import { motion } from "framer-motion"; // Animaciones para la interfaz
import { useAtom } from "jotai"; // Estado global para proyectos
import { currentProjectAtom, projects } from "./Projects"; // Datos de proyectos
import emailjs from "emailjs-com";
import { useState } from "react";

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
      <div className="mt-40 flex w-full h-full text-teal-900 gap-8 items-center justify-center">
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
  const [status, setStatus] = useState("");

  // Claves reales de EmailJS
  const SERVICE_ID = "service_jcl3zms";
  const TEMPLATE_ID = "template_j766oyk";
  const PUBLIC_KEY = "AEcmMTaXzEYmNbGPO";

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("");
    const form = e.target;
    // Mostrar los datos enviados para depuración
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(`Campo enviado: ${key} = ${value}`);
    }
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(
        (result) => {
          setStatus("success");
          form.reset();
        },
        (error) => {
          setStatus("error");
          console.error("EmailJS error:", error);
        }
      );
  };

  return (
    <Section>
      <h2 className="text-5xl text-teal-700 font-bold">Contact me</h2>
      <div className="h-full w-full flex items-start justify-start">
        <div className="p-6 rounded-md bg-teal-100 w-80 max-w-full flex flex-col justify-center mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center">
            {/* Campo nombre */}
            <label htmlFor="name" className="font-medium text-teal-700 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
            />
            {/* Campo email */}
            <label
              htmlFor="email"
              className="font-medium text-teal-700 block mb-1 mt-4"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
            />
            {/* Campo asunto */}
            <label htmlFor="subject" className="font-medium text-teal-700 block mb-1 mt-4">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              className="block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
            />
            {/* Campo mensaje */}
            <label
              htmlFor="message"
              className="font-medium text-teal-700 block mb-1 mt-4"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="h-24 block w-full rounded-md border-0 text-teal-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 p-3"
              style={{ resize: "none" }}
            />
            {/* Botón de envío */}
            <button className="bg-teal-700 text-white py-3 px-6 rounded-lg font-bold text-base mt-8 hover:bg-teal-900 transition-colors">
              Submit
            </button>
            {/* Feedback visual */}
            {status === "success" && (
              <p className="text-green-600 mt-4">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-4">Error sending message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};
