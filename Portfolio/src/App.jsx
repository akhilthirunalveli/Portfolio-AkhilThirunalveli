import React, { useRef, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { gsap } from 'gsap'
import Typewriter from './Typewriter'
import { IoGridOutline, IoDocumentText } from "react-icons/io5"
import "@theme-toggles/react/css/Expand.css"
import { Expand } from "@theme-toggles/react"
import './styles.css'
import { Dock, DockIcon } from './components/Dock'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'
import { SiLeetcode, SiMongodb } from 'react-icons/si'

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
	const [isMobile, setIsMobile] = useState(false)
	const dragRef = useRef(null)
	const dragOffset = useRef({ x: 0, y: 0 })
	const themeButtonRef = useRef(null)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

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

	const toggleTheme = async () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark'

		// Return early if View Transition API is not supported or user prefers reduced motion
		if (
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			setTheme(nextTheme)
			return
		}

		await document.startViewTransition(() => {
			flushSync(() => {
				setTheme(nextTheme)
			})
		}).ready

		document.documentElement.animate(
			{
				clipPath: [
					'inset(0 0 100% 0)',
					'inset(0 0 0 0)',
				],
			},
			{
				duration: 500,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)',
			}
		)
	}

	const getProjectsGridClass = () => {
		if (isListView) return 'flex flex-col gap-[0.5cm]'
		if (isMobile) return 'grid grid-cols-1 gap-[0.5cm]'
		return 'grid grid-cols-2 gap-[0.5cm]'
	}

	return (
		<div
			className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
		>
			{/* Theme transition blur overlay removed */}

			{/* Theme toggle button */}
			<div
				ref={themeButtonRef}
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

			{/* Wrapper with padding for main content */}
			<div
				className="flex-grow px-4 sm:px-0"
				style={{
					paddingLeft: 'max(env(safe-area-inset-left), 16px)',
					paddingRight: 'max(env(safe-area-inset-right), 16px)',
				}}
			>
				{/* Main content */}
				<div className="w-full max-w-[15cm] px-6 sm:px-6 py-12 space-y-12 mx-auto">
					{/* Intro */}
					<section className="space-y-3 text-left">
						<h1 className="text-4xl font-semibold">Akhil Thirunalveli</h1>
						<p className="text-lg text-gray-500 dark:text-gray-400">
							21, <Typewriter words={["Full Stack Developer", "Tech Nerd", "Software Engineer", "Sleepy"]} />
						</p>
						<p className="text-base text-gray-500 dark:text-gray-400 ">
							Full stack developer with really good OCD which means you won't lose any feature or aesthetics. Currently, looking to start as Software Developer. Meanwhile I am building MockMate (v1.3).</p>
						<p className="text-base text-gray-500 dark:text-gray-400 opacity-95 select-none">
							Apart from work, you will find me asleep. You can always reach me at <span className="font-semibold text-black dark:text-white border-b-2 border-blue-500 select-text">thirunalveliakhil@gmail.com</span>.
						</p>
					</section>

					<section className="space-y-6 text-left">
						<h2 className="text-2xl font-semibold text-black dark:text-white transition-colors duration-300">Skills</h2>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
							{[
								'React',
								'Node.js',
								'React Native',
								'MySQL',
								'PostgreSQL',
								'MongoDB',
								'Firebase',
								'AWS',
								'Docker',
							].map(skill => (
								<span key={skill} className="skill-pill" style={{
									padding: '0.5rem 1rem',
									borderRadius: '999px',
									background: theme === 'dark' ? 'black' : 'black',
									color: 'white',
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
								<p className="font-bold text-lg">Google Developer Groups</p>
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

						<div className={getProjectsGridClass()}>
							<ProjectCard src="/Projects/1.png" alt="MockMate" link="https://mockmateapp.vercel.app/" />
							<ProjectCard src="/Projects/3.png" alt="NewsSailor" link="https://www.newssailor.com/" />
							<ProjectCard src="/Projects/2.png" alt="KnowMyStatus" link="https://knowmystatus.vercel.app/" />
							<ProjectCard src="/Projects/4.png" alt="DraftEngine" link="https://draftengine.vercel.app/" />
							<ProjectCard src="/Projects/5.png" alt="Mausam" link="https://aajkamausam.vercel.app/" />
							<ProjectCard src="/Projects/6.png" alt="Exam | VIT" link="https://vitexam.vercel.app/" />
						</div>

						{/* Dock below projects */}
						<div className="flex w-full justify-center mt-[1cm]">
							<Dock direction="middle" iconSize={40} iconMagnification={64} iconDistance={140} className="text-black dark:text-white">
								{/* Resume with static label beside icon (no underline) */}
								<DockIcon>
									<a
										href="/AkhilThirunalveli_VITB_22BET10003.pdf"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Resume"
										className="flex items-center gap-2 text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity no-underline hover:no-underline"
										style={{ color: 'inherit' }}
									>
										<IoDocumentText size={22} color="currentColor" />
									</a>
								</DockIcon>

								{/* X (Twitter) */}
								<DockIcon>
									<a
										href="https://x.com/archivebyakhil"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="X"
										className="text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity"
										style={{ color: 'inherit' }}
									>
										<RiTwitterXLine size={22} color="currentColor" />
									</a>
								</DockIcon>

								{/* LeetCode */}
								<DockIcon>
									<a
										href="https://leetcode.com/akhilthirunalveli"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="LeetCode"
										className="text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity"
										style={{ color: 'inherit' }}
									>
										<SiLeetcode size={22} color="currentColor" />
									</a>
								</DockIcon>

								<DockIcon>
									<a
										href="https://github.com/akhilthirunalveli"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub"
										className="text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity"
										style={{ color: 'inherit' }}
									>
										<FaGithub size={22} color="currentColor" />
									</a>
								</DockIcon>

								<DockIcon>
									<a
										href="https://www.linkedin.com/in/akhilthirunalveli/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="LinkedIn"
										className="text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity"
										style={{ color: 'inherit' }}
									>
										<FaLinkedin size={22} color="currentColor" />
									</a>
								</DockIcon>
								<DockIcon>
									<a
										href="mailto:thirunalveliakhil@gmail.com"
										aria-label="Email"
										className="text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity"
										style={{ color: 'inherit' }}
									>
										<FaEnvelope size={22} color="currentColor" />
									</a>
								</DockIcon>
							</Dock>
						</div>
					</section>
				</div>
			</div>

			{/* Bottom section with AKHIL (laptop/desktop only) */}
			{!isMobile && (
				<footer
					className={`w-full blur-gradient-bottom ${theme === 'dark'
						? 'bg-gradient-to-b from-black via-[#1a1a40] via-[#0f1030] to-[#0b2b6b]'
						: 'bg-gradient-to-b from-white via-blue-200 via-blue-100 to-[#93b4f5]'
						} flex items-end justify-center pt-20 pb-0 mt-10 relative overflow-hidden`}
					style={{
						maskImage: 'linear-gradient(to bottom, transparent, #08090A 15%)',
						WebkitMaskImage: 'linear-gradient(to bottom, transparent, #08090A 15%)'
					}}
				>
					<h2
						className="select-none text-center font-black text-white leading-none mb-[-50px] relative z-10"
						style={{
							fontSize: 'clamp(4rem, 20vw, 18rem)',
							letterSpacing: '0.05em',
							opacity: theme === 'dark' ? 0.1 : 0.2,
						}}
						aria-hidden="true"
					>
						AKHIL
					</h2>
				</footer>
			)}
		</div>
	)
}