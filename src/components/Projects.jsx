// Componente Projects: muestra una galería 3D de proyectos con animaciones y navegación
import { Image, Text } from "@react-three/drei"; // Componentes para imágenes y texto en R3F
import { useFrame, useThree } from "@react-three/fiber"; // Hooks para animaciones y viewport
import { animate, useMotionValue } from "framer-motion"; // Animaciones reactivas
import { motion } from "framer-motion-3d"; // Animaciones 3D
import { atom, useAtom } from "jotai"; // Estado global para el proyecto actual
import { useEffect, useRef } from "react"; // Hooks de React

// Array de proyectos a mostrar
export const projects = [
	{
		title: "App Almacenaje",
		url: "https://github.com/GermanVG7",
		image: "projects/almacen.jpg",
		description: "Final project of the Training course in Multiplatform Application Development",
	},
	{
		title: "Web Lea Thieux",
		url: "https://github.com/GermanVG7/WebArteLea.git",
		image: "projects/WebLeaThieux.JPG",
		description: "Prototype website for the artist Lea Thieux",
	},
	{
		title: "Portfolio 3D",
		url: "https://github.com/GermanVG7/Portfolio3D.git",
		image: "projects/Portfolio-3D.JPG",
		description: "Use React Three Fiber to create a 3D portfolio",
	},
	{
		title: "DigitlandWP",
		url: "https://github.com/GermanVG7/DigitlandWP.git",
		image: "projects/DigiitlandWP.JPG",
		description: "Project in WordPress with Timber and Twig",
	},
];

// Componente para renderizar un solo proyecto
const Project = (props) => {
	const { project, highlighted } = props;

	const background = useRef(); // Referencia al mesh de fondo
	const bgOpacity = useMotionValue(0.4); // Opacidad animada del fondo

	// Cambia la opacidad del fondo al resaltar el proyecto
	useEffect(() => {
		animate(bgOpacity, highlighted ? 0.7 : 0.4);
	}, [highlighted]);

	// Actualiza la opacidad del material en cada frame
	useFrame(() => {
		background.current.material.opacity = bgOpacity.get();
	});

	return (
		<group {...props}>
			{/* Fondo negro semitransparente, clicable para abrir el proyecto */}
			<mesh
				position-z={-0.001}
				onClick={() => window.open(project.url, "_blank")}
				ref={background}
			>
				<planeGeometry args={[3, 2.5]} />
				<meshBasicMaterial color="black" transparent opacity={0.4} />
			</mesh>
			{/* Imagen del proyecto */}
			<Image
				scale={[2.7, 1.7, 1]}
				url={project.image}
				toneMapped={false}
				position-y={0.5}
				transparent
				opacity={1}
				fit="cover"
				center={[0.5, 0.5]}
			/>
			{/* Título del proyecto */}
			<Text
				maxWidth={2.7}
				anchorX={"left"}
				anchorY={"top"}
				fontSize={0.28}
				position={[-1.3, -0.5, 0]}
			>
				{project.title.toUpperCase()}
			</Text>
			{/* Descripción del proyecto */}
			<Text
				maxWidth={2.7}
				anchorX="left"
				anchorY="top"
				fontSize={0.14}
				position={[-1.3, -0.8, 0]}
			>
				{project.description}
			</Text>
		</group>
	);
};

// Estado global para el índice del proyecto actual
export const currentProjectAtom = atom(Math.floor(projects.length / 2));

// Componente principal de la galería de proyectos
export const Projects = () => {
	const { viewport } = useThree(); // Dimensiones del viewport
	const [currentProject] = useAtom(currentProjectAtom); // Índice del proyecto actual

	return (
		// Posiciona la galería en la sección correspondiente
		<group position-y={-viewport.height * 2 + 1}>
			{/* Renderiza cada proyecto con animaciones de posición y rotación */}
			{projects.map((project, index) => (
				<motion.group
					key={"project_" + index}
					position={[index * 3.5, 0, -3]}
					animate={{
						x: 0 + (index - currentProject) * 3.5,
						y: currentProject === index ? 0 : -0.1,
						z: currentProject === index ? -2 : -3,
						rotateX: currentProject === index ? 0 : -Math.PI / 3,
						rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
					}}
				>
					<Project project={project} highlighted={index === currentProject} />
				</motion.group>
			))}
		</group>
	);
};
