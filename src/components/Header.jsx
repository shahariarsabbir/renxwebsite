import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { IoMdContacts } from 'react-icons/io'
import { MdContactSupport } from 'react-icons/md'
import { Box, Button, Text, Heading } from '@chakra-ui/react'
import Card3d from './utils/Card3d.jsx'
import Navbar from './Navbar.jsx'
import '../styles/header.css'

const topics = [
	{
		icon: '🌐',
		title: 'Web Development',
		desc: 'HTML, CSS, JavaScript, React, Node.js',
		image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400',
	},
	{
		icon: '🐍',
		title: 'Python',
		desc: 'Scripting, automation, data handling',
		image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
	},
	{
		icon: '📱',
		title: 'Mobile Dev',
		desc: 'React Native, Flutter, iOS & Android',
		image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
	},
	{
		icon: '🗄️',
		title: 'Databases',
		desc: 'SQL, MongoDB, Firebase, PostgreSQL',
		image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
	},
	{
		icon: '🤖',
		title: 'AI & Data Science',
		desc: 'Machine learning, pandas, TensorFlow',
		image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
	},
	{
		icon: '🔐',
		title: 'Cybersecurity',
		desc: 'Ethical hacking, network security',
		image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
	},
]

const testimonials = [
	{
		name: 'Ahmed K.',
		role: 'Junior Developer',
		text: 'RENX helped me land my first dev job in 6 months. The courses are practical and easy to follow.',
		avatar: '👨‍💻',
	},
	{
		name: 'Sara M.',
		role: 'Freelance Designer',
		text: 'I learned React from scratch here. The projects in the course gave me a real portfolio.',
		avatar: '👩‍💻',
	},
	{
		name: 'James T.',
		role: 'Data Analyst',
		text: 'The Python and Data Science course was exactly what I needed to switch careers.',
		avatar: '🧑‍💻',
	},
]

const Header = () => {
	return (
		<div>
			<Navbar />
			<Main />
		</div>
	)
}

const Main = () => {
	const navigate = useNavigate()

	const handleGetStarted = () =>
		document
			.getElementById('get-started')
			?.scrollIntoView({ behavior: 'smooth' })
	const handleBrowseCourses = () => navigate('/courses')

	return (
		<div className="renx-page-root">
			{/* ── Hero Section ── */}
			<Box
				className="renx-hero-box"
				style={{
					width: '100vw',
					minHeight: '100vh',

					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
					padding: '2rem',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* ── Background glow blobs ── */}
				<div
					style={{
						position: 'absolute',
						top: '10%',
						left: '15%',
						width: '400px',
						height: '400px',
						borderRadius: '50%',
						background:
							'radial-gradient(circle, rgba(49,130,206,0.2) 0%, transparent 70%)',
						pointerEvents: 'none',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '10%',
						right: '10%',
						width: '350px',
						height: '350px',
						borderRadius: '50%',
						background:
							'radial-gradient(circle, rgba(99,179,237,0.15) 0%, transparent 70%)',
						pointerEvents: 'none',
					}}
				/>

				{/* ── Dot grid overlay ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage:
							'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
						backgroundSize: '32px 32px',
						pointerEvents: 'none',
					}}
				/>

				{/* ── Content ── */}
				<Box style={{ position: 'relative', zIndex: 1, marginTop: '80px' }}>
					{/* Badge */}
					<Box
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.5rem',

							border: '1px solid rgba(49,130,206,0.35)',
							color: '#90CDF4',
							padding: '0.4rem 1.2rem',
							borderRadius: '999px',
							fontSize: '0.85rem',
							fontWeight: '600',
							marginBottom: '2rem',
							letterSpacing: '0.04em',
						}}
					>
						<span
							style={{
								width: '6px',
								height: '6px',
								borderRadius: '50%',
								backgroundColor: '#63B3ED',
								boxShadow: '0 0 6px #63B3ED',
								display: 'inline-block',
							}}
						/>
						💻 Learn Programming at Your Own Pace
					</Box>

					{/* Heading */}
					<Heading
						className="renx-hero-heading"
						style={{
							color: '#fff',
							fontSize: 'clamp(2.2rem, 5vw, 4rem)',
							fontWeight: '900',
							lineHeight: '1.15',
							maxWidth: '780px',
							marginBottom: '1.5rem',
							letterSpacing: '-0.02em',
						}}
					>
						Master Coding Skills &{' '}
						<span
							style={{
								background: 'linear-gradient(135deg, #63B3ED, #3182CE)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
							}}
						>
							Launch Your Career
						</span>
					</Heading>

					{/* Subtext */}
					<Text
						className="renx-hero-sub"
						style={{
							color: 'rgba(255,255,255,0.6)',
							fontSize: '1.15rem',
							maxWidth: '520px',
							marginBottom: '2.5rem',
							lineHeight: '1.8',
							margin: '0 auto 2.5rem',
						}}
					>
						RENX offers hands-on programming courses for all levels — from
						complete beginners to advanced developers. Buy a course once, learn
						forever.
					</Text>

					{/* Buttons */}
					<div
						className="renx-hero-buttons"
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						<Button
							onClick={handleGetStarted}
							style={{
								background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
								color: '#fff',
								padding: '0.85rem 2.2rem',
								borderRadius: '999px',
								fontWeight: '700',
								fontSize: '1rem',
								cursor: 'pointer',
								border: 'none',
								boxShadow: '0 8px 24px rgba(49,130,206,0.45)',
								transition: 'all 0.3s ease',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-2px)'
								e.currentTarget.style.boxShadow =
									'0 12px 32px rgba(49,130,206,0.6)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)'
								e.currentTarget.style.boxShadow =
									'0 8px 24px rgba(49,130,206,0.45)'
							}}
						>
							Get Started →
						</Button>

						<Button
							onClick={handleBrowseCourses}
							style={{
								backgroundColor: 'rgba(255,255,255,0.07)',
								color: '#fff',
								padding: '0.85rem 2.2rem',
								borderRadius: '999px',
								fontWeight: '700',
								fontSize: '1rem',
								cursor: 'pointer',
								border: '1px solid rgba(255,255,255,0.15)',
								backdropFilter: 'blur(8px)',
								transition: 'all 0.3s ease',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'
								e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'
								e.currentTarget.style.border =
									'1px solid rgba(255,255,255,0.15)'
							}}
						>
							Browse Courses
						</Button>
					</div>

					{/* Divider */}
					<Box
						style={{
							width: '1px',
							height: '40px',
							background:
								'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',
							margin: '3rem auto',
						}}
					/>

					{/* Stats */}
					<div
						style={{
							display: 'flex',
							gap: '0',
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						{[
							{ value: '200+', label: 'Courses Available' },
							{ value: '50k+', label: 'Students Learning' },
							{ value: 'All', label: 'Skill Levels Welcome' },
						].map(({ value, label }, index) => (
							<div
								key={label}
								className="renx-stat-item"
								style={{
									textAlign: 'center',
									padding: '0 2.5rem',
									borderRight:
										index < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
								}}
							>
								<Text
									style={{
										background: 'linear-gradient(135deg, #fff, #90CDF4)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										fontSize: '2.2rem',
										fontWeight: '900',
										letterSpacing: '-0.02em',
									}}
								>
									{value}
								</Text>
								<Text
									style={{
										color: 'rgba(255,255,255,0.45)',
										fontSize: '0.8rem',
										marginTop: '0.2rem',
									}}
								>
									{label}
								</Text>
							</div>
						))}
					</div>
				</Box>
			</Box>

			{/* ── Course Categories ── */}
			<Box
				className="renx-section-pad"
				style={{
					width: '100vw',

					padding: '5rem 2rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Text
					style={{
						color: '#90CDF4',
						fontWeight: '700',
						fontSize: '0.9rem',
						letterSpacing: '0.1em',
						marginBottom: '0.5rem',
					}}
				>
					WHAT YOU CAN LEARN
				</Text>
				<Heading
					style={{
						fontSize: '2.5rem',
						fontWeight: '800',
						marginBottom: '1rem',
						color: '#fff',
					}}
				>
					Explore Programming Topics
				</Heading>
				<Text
					style={{
						color: '#aaa',
						fontSize: '1.1rem',
						maxWidth: '500px',
						marginBottom: '1rem',
					}}
				>
					From your very first line of code to building full production apps —
					we have a course for every step of your journey.
				</Text>

				<div
					className="renx-topics-grid"
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
						gap: '0rem',
						width: '100%',
						maxWidth: '1100px',
						justifyItems: 'center',
					}}
				>
					{topics.map(({ title, image, desc, icon }) => (
						<div
							key={title}
							onClick={() => navigate('/courses')}
							style={{ cursor: 'pointer' }}
						>
							<Card3d image={image} title={title} desc={desc} icon={icon} />
						</div>
					))}
				</div>
			</Box>

			{/* ── Why RENX ── */}
			<Box
				className="renx-section-pad"
				style={{
					width: '100vw',

					padding: '6rem 2rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				{/* Badge */}
				<Box
					style={{
						backgroundColor: 'rgba(49,130,206,0.15)',
						border: '1px solid rgba(49,130,206,0.3)',
						color: '#90CDF4',
						padding: '0.3rem 1.2rem',
						borderRadius: '999px',
						fontSize: '0.8rem',
						fontWeight: '700',
						letterSpacing: '0.12em',
						marginBottom: '1.25rem',
					}}
				>
					WHY RENX
				</Box>

				<Heading
					className="renx-why-heading"
					style={{
						fontSize: '2.8rem',
						fontWeight: '900',
						marginBottom: '1rem',
						color: '#fff',
						lineHeight: '1.2',
					}}
				>
					Everything You Need{' '}
					<span style={{ color: '#3182CE' }}>to Succeed</span>
				</Heading>

				<Text
					style={{
						color: '#888',
						fontSize: '1.05rem',
						maxWidth: '480px',
						marginBottom: '4rem',
						lineHeight: '1.7',
					}}
				>
					We built RENX to give every student the tools, content, and
					flexibility to become a great developer.
				</Text>

				{/* Cards grid */}
				<div
					className="renx-why-grid"
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: '1.5rem',
						width: '100%',
						maxWidth: '1000px',
					}}
				>
					{[
						{
							icon: '🎯',
							title: 'Project-Based Learning',
							desc: 'Every course includes real projects you can add to your portfolio.',
						},
						{
							icon: '⏱️',
							title: 'Learn at Your Own Pace',
							desc: 'No deadlines. Access your course forever and learn when it suits you.',
						},
						{
							icon: '💳',
							title: 'Pay Once, Own Forever',
							desc: 'No subscriptions. Buy a course once and keep it for life.',
						},
						{
							icon: '🏆',
							title: 'Earn Certificates',
							desc: 'Get a certificate on completion to prove your skills to employers.',
						},
						{
							icon: '👨‍🏫',
							title: 'Expert Instructors',
							desc: 'Learn from approved professionals with real industry experience.',
						},
						{
							icon: '📱',
							title: 'Learn Anywhere',
							desc: 'Access your courses from any device — desktop, tablet, or mobile.',
						},
					].map(({ icon, title, desc }) => (
						<Box
							key={title}
							style={{
								background: 'rgba(255,255,255,0.03)',
								border: '1px solid rgba(255,255,255,0.07)',
								borderRadius: '20px',
								padding: '2rem',
								textAlign: 'left',
								backdropFilter: 'blur(10px)',
								transition: 'all 0.3s ease',
								cursor: 'default',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'rgba(49,130,206,0.1)'
								e.currentTarget.style.border = '1px solid rgba(49,130,206,0.35)'
								e.currentTarget.style.transform = 'translateY(-4px)'
								e.currentTarget.style.boxShadow =
									'0 12px 40px rgba(49,130,206,0.15)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
								e.currentTarget.style.border =
									'1px solid rgba(255,255,255,0.07)'
								e.currentTarget.style.transform = 'translateY(0)'
								e.currentTarget.style.boxShadow = 'none'
							}}
						>
							<Box
								style={{
									width: '48px',
									height: '48px',
									borderRadius: '12px',
									backgroundColor: 'rgba(49,130,206,0.15)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '1.5rem',
									marginBottom: '1.25rem',
								}}
							>
								{icon}
							</Box>

							<Text
								style={{
									fontWeight: '700',
									fontSize: '1rem',
									color: '#fff',
									marginBottom: '0.5rem',
								}}
							>
								{title}
							</Text>

							<Text
								style={{
									color: '#666',
									fontSize: '0.875rem',
									lineHeight: '1.7',
								}}
							>
								{desc}
							</Text>
						</Box>
					))}
				</div>
			</Box>

			{/* ── Testimonials ── */}
			<Box
				className="renx-section-pad"
				style={{
					width: '100vw',

					// background: 'lineargradient(120deg, #0a0f1e 0%, #142e63 100%)',
					padding: '5rem 2rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Text
					style={{
						color: '#90CDF4',
						fontWeight: '700',
						fontSize: '0.9rem',
						letterSpacing: '0.1em',
						marginBottom: '0.5rem',
					}}
				>
					STUDENT STORIES
				</Text>
				<Heading
					style={{
						fontSize: '2.5rem',
						fontWeight: '800',
						marginBottom: '3rem',
						color: '#fff',
					}}
				>
					What Our Students Say
				</Heading>

				<div
					className="renx-testimonials-row"
					style={{
						display: 'flex',
						gap: '2rem',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{testimonials.map(({ name, role, text, avatar }) => (
						<Box
							key={name}
							className="renx-testimonial-card"
							style={{
								backgroundColor: 'rgba(255,255,255,0.06)',
								borderRadius: '16px',
								padding: '2rem',
								width: '280px',
								textAlign: 'left',
								border: '1px solid rgba(255,255,255,0.1)',
							}}
						>
							<Text style={{ fontSize: '2rem', marginBottom: '1rem' }}>
								{avatar}
							</Text>
							<Text
								style={{
									color: '#fff',
									fontSize: '0.9rem',
									lineHeight: '1.7',
									marginBottom: '1.5rem',
									fontStyle: 'italic',
								}}
							>
								"{text}"
							</Text>
							<Text
								style={{
									color: '#90CDF4',
									fontWeight: '700',
									fontSize: '0.9rem',
								}}
							>
								{name}
							</Text>
							<Text style={{ color: '#666', fontSize: '0.8rem' }}>{role}</Text>
						</Box>
					))}
				</div>
			</Box>

			{/* ── How It Works ── */}
			<Box
				id="get-started"
				className="renx-section-pad"
				style={{
					width: '100vw',
					minHeight: '100vh',

					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
					padding: '6rem 2rem',
				}}
			>
				{/* Badge */}
				<Box
					style={{
						backgroundColor: 'rgba(49,130,206,0.1)',
						border: '1px solid rgba(49,130,206,0.25)',
						color: '#3182CE',
						padding: '0.3rem 1.2rem',
						borderRadius: '999px',
						fontSize: '0.8rem',
						fontWeight: '700',
						letterSpacing: '0.12em',
						marginBottom: '1.25rem',
						display: 'inline-block',
					}}
				>
					HOW IT WORKS
				</Box>

				<Heading
					className="renx-how-heading"
					style={{
						fontSize: '2.8rem',
						fontWeight: '900',
						marginBottom: '1rem',
						color: '#f3f3f6',
						lineHeight: '1.2',
					}}
				>
					Start Learning in <span style={{ color: '#3182CE' }}>Minutes</span>
				</Heading>

				<Text
					style={{
						color: '#888',
						fontSize: '1.05rem',
						maxWidth: '480px',
						marginBottom: '5rem',
						lineHeight: '1.7',
					}}
				>
					No complicated setup. Just pick a course, pay once, and start learning
					immediately at your own pace.
				</Text>

				{/* Steps */}
				<div
					className="renx-how-grid"
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
						gap: '1.5rem',
						width: '100%',
						maxWidth: '1000px',
						marginBottom: '4rem',
						position: 'relative',
					}}
				>
					{[
						{
							step: '01',
							icon: '🔍',
							title: 'Find a Course',
							desc: 'Browse by topic or skill level. Filter by beginner, intermediate, or advanced.',
						},
						{
							step: '02',
							icon: '💳',
							title: 'Buy Once',
							desc: 'Pay a one-time fee. No subscriptions, no hidden charges. Yours forever.',
						},
						{
							step: '03',
							icon: '▶️',
							title: 'Start Learning',
							desc: 'Watch lessons, complete exercises, and build real projects at your pace.',
						},
						{
							step: '04',
							icon: '🏆',
							title: 'Get Certified',
							desc: 'Finish and earn a certificate to show employers your new skills.',
						},
					].map(({ step, icon, title, desc }, index) => (
						<Box
							key={step}
							style={{
								backgroundColor: '#fff',
								borderRadius: '24px',
								padding: '2.5rem 2rem',
								textAlign: 'left',
								border: '1px solid rgba(0,0,0,0.06)',
								boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
								position: 'relative',
								overflow: 'hidden',
								transition: 'all 0.3s ease',
								cursor: 'default',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-6px)'
								e.currentTarget.style.boxShadow =
									'0 16px 48px rgba(49,130,206,0.15)'
								e.currentTarget.style.border = '1px solid rgba(49,130,206,0.2)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)'
								e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'
								e.currentTarget.style.border = '1px solid rgba(0,0,0,0.06)'
							}}
						>
							{/* Big step number watermark */}
							<Text
								style={{
									position: 'absolute',
									top: '-10px',
									right: '16px',
									fontSize: '6rem',
									fontWeight: '900',
									color: 'rgba(49,130,206,0.06)',
									lineHeight: '1',
									userSelect: 'none',
									pointerEvents: 'none',
								}}
							>
								{step}
							</Text>

							{/* Icon box */}
							<Box
								style={{
									width: '52px',
									height: '52px',
									borderRadius: '14px',
									background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '1.5rem',
									marginBottom: '1.5rem',
									boxShadow: '0 4px 14px rgba(49,130,206,0.3)',
								}}
							>
								{icon}
							</Box>

							{/* Step label */}
							<Text
								style={{
									fontSize: '0.7rem',
									fontWeight: '800',
									color: '#3182CE',
									letterSpacing: '0.12em',
									marginBottom: '0.4rem',
								}}
							>
								STEP {step}
							</Text>

							<Text
								style={{
									fontWeight: '800',
									fontSize: '1.05rem',
									color: '#0a0f1e',
									marginBottom: '0.6rem',
								}}
							>
								{title}
							</Text>

							<Text
								style={{
									color: '#888',
									fontSize: '0.875rem',
									lineHeight: '1.7',
								}}
							>
								{desc}
							</Text>

							{/* Connector arrow — not on last card */}
							{index < 3 && (
								<Text
									className="renx-step-arrow"
									style={{
										position: 'absolute',
										top: '50%',
										right: '-18px',
										transform: 'translateY(-50%)',
										fontSize: '1.2rem',
										color: '#3182CE',
										zIndex: 10,
										display: window.innerWidth > 768 ? 'block' : 'none',
									}}
								>
									→
								</Text>
							)}
						</Box>
					))}
				</div>

				{/* CTA Button */}
				<Button
					onClick={() => navigate('/courses')}
					style={{
						background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
						color: '#fff',
						padding: '0.9rem 2.8rem',
						borderRadius: '999px',
						fontWeight: '800',
						fontSize: '1rem',
						cursor: 'pointer',
						border: 'none',
						boxShadow: '0 8px 24px rgba(49,130,206,0.4)',
						transition: 'all 0.3s ease',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-2px)'
						e.currentTarget.style.boxShadow = '0 12px 32px rgba(49,130,206,0.5)'
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)'
						e.currentTarget.style.boxShadow = '0 8px 24px rgba(49,130,206,0.4)'
					}}
				>
					Browse All Courses →
				</Button>
			</Box>

			{/* ── Footer CTA ── */}
			<Box
				className="renx-section-pad"
				style={{
					width: '100vw',
					background: 'linear-gradient(135deg, #1f1f1f 0%, #3182CE 100%)',
					padding: '5rem 2rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Heading
					className="renx-cta-heading"
					style={{
						color: '#fff',
						fontSize: '2.5rem',
						fontWeight: '800',
						maxWidth: '600px',
						marginBottom: '1rem',
					}}
				>
					Ready to Start Your Coding Journey?
				</Heading>
				<Text
					style={{
						color: 'rgba(255,255,255,0.75)',
						fontSize: '1.1rem',
						maxWidth: '480px',
						marginBottom: '2.5rem',
						lineHeight: '1.7',
					}}
				>
					Join 50,000+ students already learning on RENX. Pick your first course
					today.
				</Text>
				<Button
					onClick={() => navigate('/courses')}
					style={{
						backgroundColor: '#fff',
						color: '#3182CE',
						padding: '0.85rem 2.5rem',
						borderRadius: '999px',
						fontWeight: 'bold',
						fontSize: '1rem',
						cursor: 'pointer',
						border: 'none',
					}}
				>
					Explore Courses →
				</Button>
			</Box>
		</div>
	)
}

export default Header
