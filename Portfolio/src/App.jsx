import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Typewriter from './Typewriter'
import { IoGridOutline } from "react-icons/io5"
import "@theme-toggles/react/css/Expand.css"
import { Expand } from "@theme-toggles/react"
import './styles.css'

function ProjectCard({ src, alt, link }) {
	const cardRef = useRef(null)

	const handleMouseEnter = () => {
		if (!cardRef.current) return
		gsap.to(cardRef.current, { scale: 1.05, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
	}
	const handleMouseLeave = () => {
		if (!cardRef.current) return
		gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
	}
	const handleClick = () => link && window.open(link, '_blank', 'noopener,noreferrer')

	return (
		<div
			ref={cardRef}
			className="relative group rounded-[15px] shadow-lg cursor-pointer overflow-hidden"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			style={{
				cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'%3E%3Cpath fill=\'white\' d=\'M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z\'/\%3E%3C/svg%3E") 12 12, pointer',
				willChange: 'transform'
			}}
		>
			<div className="w-full h-80 flex items-center justify-center bg-gray-900 dark:bg-gray-800 rounded-[15px]">
				<img src={src} alt={alt} className="w-full h-full object-contain" />
			</div>
		</div>
	)
}

export default function App() {
	const [theme, setTheme] = useState('dark')
	const [isListView, setIsListView] = useState(false)
	const [isDragging, setIsDragging] = useState(false)
	const dragRef = useRef(null)
	const dragOffset = useRef({ x: 0, y: 0 })
	const overlayRef = useRef(null)
	const circleRef = useRef(null)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	const toggleView = () => setIsListView(!isListView)

	// Grid icon drag logic
	const handleGridMouseDown = (e) => {
		setIsDragging(true)
		dragOffset.current = {
			x: e.clientX - (dragRef.current?.getBoundingClientRect().left || 0),
			y: e.clientY - (dragRef.current?.getBoundingClientRect().top || 0)
		}
		document.body.style.cursor = 'grabbing'
	}
	const handleGridMouseUp = () => {
		setIsDragging(false)
		document.body.style.cursor = ''
	}
	const handleGridMouseMove = (e) => {
		if (!isDragging || !dragRef.current) return
		const x = e.clientX - dragOffset.current.x
		const y = e.clientY - dragOffset.current.y
		gsap.to(dragRef.current, { x, y, duration: 2, ease: 'power2.out' })
	}
	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleGridMouseMove)
			window.addEventListener('mouseup', handleGridMouseUp)
		}
		return () => {
			window.removeEventListener('mousemove', handleGridMouseMove)
			window.removeEventListener('mouseup', handleGridMouseUp)
		}
	}, [isDragging])

	// Fancy theme change animation
	const getCoverScale = (base = 200) => {
		const w = window.innerWidth
		const h = window.innerHeight
		const radiusNeeded = Math.hypot(w, h) / 2
		return radiusNeeded / (base / 2)
	}
	const playThemeTransition = (nextTheme) => {
		const overlay = overlayRef.current
		const circle = circleRef.current
		if (!overlay || !circle) return setTheme(nextTheme)
		overlay.style.display = 'block'
		const targetScale = getCoverScale(240) * 1.2

		gsap.set(circle, {
			scale: 0.001,
			opacity: 0,
			backgroundColor: nextTheme === 'dark' ? '#000' : '#fff',
			filter: 'blur(0px)',
			y: window.innerHeight * 0.6,
		})

		const tl = gsap.timeline()
		tl.to(circle, {
			duration: 1.2,
			ease: 'sine.inOut',
			scale: targetScale,
			opacity: 0.2,
			filter: 'blur(30px)',
			y: -window.innerHeight * 0.6,
		}, 0)
			.add(() => setTheme(nextTheme), 0.6)
			.to(circle, {
				duration: 0.4,
				ease: 'sine.out',
				opacity: 0,
				filter: 'blur(50px)'
			}, 1.2)
			.set(overlay, { display: 'none' })
	}

	const toggleTheme = () => playThemeTransition(theme === 'dark' ? 'light' : 'dark')

	return (
		<div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
			{/* Theme transition blur overlay */}
			<div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[999] hidden">
				<div ref={circleRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full backdrop-blur-2xl" />
			</div>

			{/* Theme toggle button */}
			<div
				className="fixed z-[1000]"
				style={{
					right: 'max(16px, env(safe-area-inset-right))',
					bottom: 'max(16px, env(safe-area-inset-bottom))',
					width: '36px',
					height: '36px'
				}}
			>
				<Expand
					duration={750}
					toggled={theme === 'light'}
					toggle={toggleTheme}
					className="w-full h-full rounded-full grid place-items-center cursor-pointer select-none hover:scale-105 transition-transform"
					style={{
						fontSize: '1.5rem',
						color: theme === 'dark' ? 'white' : 'black',
						opacity: 0.8
					}}
				/>
			</div>


			{/* Main content */}
			<div className="w-full max-w-[15cm] px-6 py-12 space-y-12 mx-auto flex-grow">
				{/* Intro */}
				<section className="space-y-3 text-left">
					<h1 className="text-4xl font-semibold">Akhil Thirunalveli</h1>
					<p className="text-lg text-gray-500 dark:text-gray-400">
						21, <Typewriter words={["Full Stack Developer", "Tech Nerd", "Software Engineer", "Sleepy"]} />
					</p>
					<p className="text-base text-gray-500 dark:text-gray-400 ">
						Full stack developer with really good OCD which means you won't lose any feature or aesthetics. Currently, looking to start as Software Developer. Meanwhile I am buildingMockMate.</p>
					<p className="text-base text-gray-500 dark:text-gray-400 opacity-95">
						Apart from work, you will find me asleep. You can always reach me at <span className="font-semibold text-black dark:text-white border-b-2 border-blue-500">thirunalveliakhil@gmail.com</span>
					</p>
				</section>

				{/* Skills */}
				<section className="space-y-6 text-left">
					<h2 className="text-2xl font-semibold text-black dark:text-white transition-colors duration-300">Skills</h2>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
						{[
							'React',
							'Node.js',
							'Express.js',
							'Fastify',
							'MySQL',
							'PostgreSQL',
							'MongoDB',
							'Firebase',
							'Supabase',
							'Docker',
						].map(skill => (
							<span key={skill} className="skill-pill" style={{
								padding: '0.5rem 1rem',
								borderRadius: '999px',
								background: theme === 'dark' ? 'black' : 'black',
								color: theme === 'dark' ? 'white' : 'white',
								fontWeight: 500,
								fontSize: '0.95rem',
								marginBottom: '0.25rem',
								transition: 'transform 0.3s, box-shadow 0.3s',
								cursor: 'default',
							}}>{skill}</span>
						))}
					</div>
				</section>

				{/* Career */}
				<section className="space-y-6 text-left">
					<h2 className="text-2xl font-semibold">Career</h2>
					<div className="space-y-4">
						<div>
							<p className="font-bold text-lg">Graduating College</p>
							<p className="text-gray-500 dark:text-gray-400 opacity-70">B.Tech in CSE, Sep 2022 - Jun 2026</p>
						</div>
						<div>
							<p className="font-bold text-lg">SBI Foundations</p>
							<p className="text-gray-500 dark:text-gray-400 opacity-70">SDE Intern</p>
						</div>
						<div>
							<p className="font-bold text-lg">Google Developer Group</p>
							<p className="text-gray-500 dark:text-gray-400 opacity-70">Non Technical Lead</p>
						</div>
					</div>
				</section>

				{/* Projects */}
				<section className="space-y-6 text-left">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-semibold">Projects</h2>
						<div ref={dragRef} onMouseDown={handleGridMouseDown} className="cursor-grab">
							<IoGridOutline
								className={`text-2xl cursor-pointer transition-colors ${isListView
									? 'text-gray-400 hover:text-black dark:text-gray-600 dark:hover:text-white'
									: 'text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400'
									}`}
								onClick={toggleView}
							/>
						</div>
					</div>

					<div className={`${isListView ? 'flex flex-col gap-[0.5cm]' : 'grid grid-cols-2 gap-[0.5cm]'}`}>
						<ProjectCard src="/Projects/1.png" alt="MockMate" link="https://mockmateapp.vercel.app/" />
						<ProjectCard src="/Projects/3.png" alt="NewsSailor" link="https://www.newssailor.com/" />
						<ProjectCard src="/Projects/2.png" alt="KnowMyStatus" link="https://knowmystatus.vercel.app/" />
						<ProjectCard src="/Projects/4.png" alt="AKEV" link="https://github.com/akhilthirunalveli/AKEY-React-Native/" />
						<ProjectCard src="/Projects/5.png" alt="Mausam" link="https://aajkamausam.vercel.app/" />
						<ProjectCard src="/Projects/6.png" alt="Exam | VIT" link="https://vitexam.vercel.app/" />
					</div>
				</section>
			</div>

			{/* Bottom section with AKHIL (visible after scroll, not overlapping) */}
			<footer 
				className={`w-full blur-gradient-bottom ${theme === 'dark' 
					? 'bg-gradient-to-b from-gray-900 via-[#1a1a40] via-[#0f1030] to-[#0b2b6b]' 
					: 'bg-gradient-to-b from-gray-100 via-blue-200 via-blue-100 to-[#93b4f5]'
				} flex items-end justify-center pt-20 pb-0 mt-10 relative overflow-hidden`}
			>
				<h2 
					className="select-none text-center font-black text-white leading-none mb-[-50px] relative z-10"
					style={{
						fontSize: 'clamp(4rem, 20vw, 18rem)',
						letterSpacing: '0.05em',
						opacity: theme === 'dark' ? 0.5 : 0.2,
					}}
					aria-hidden="true"
				>
					AKHIL
				</h2>
			</footer>
		</div>
	)
}
