import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import {
	IoLogoGithub,
	IoLogoTwitter,
	IoLogoLinkedin,
	IoLogoYoutube,
} from 'react-icons/io5'

const Footer = () => {
	return (
		<Box
			as="footer"
			style={{
				backgroundColor: '#0a0f1e',
				color: '#fff',
				padding: '4rem 2rem 2rem',
				width: '100%',
			}}
		>
			{/* ── Top Row ── */}
			<Box
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
					gap: '3rem',
					maxWidth: '1100px',
					margin: '0 auto',
					paddingBottom: '3rem',
					borderBottom: '1px solid rgba(255,255,255,0.08)',
				}}
			>
				{/* Brand */}
				<Box style={{ maxWidth: '260px' }}>
					<Text
						style={{
							fontSize: '1.8rem',
							fontWeight: '900',
							marginBottom: '0.75rem',
						}}
					>
						REN<span style={{ color: '#3182CE' }}>X</span>
					</Text>
					<Text
						style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.7' }}
					>
						Learn programming from expert instructors. Buy a course once, own it
						forever. Start your coding journey today.
					</Text>

					{/* Social icons */}
					<Box style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
						{[
							{ icon: <IoLogoGithub />, href: '#' },
							{ icon: <IoLogoTwitter />, href: '#' },
							{ icon: <IoLogoLinkedin />, href: '#' },
							{ icon: <IoLogoYoutube />, href: '#' },
						].map(({ icon, href }, i) => (
							<Link
								key={i}
								href={href}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '38px',
									height: '38px',
									borderRadius: '50%',
									backgroundColor: 'rgba(255,255,255,0.07)',
									color: '#aaa',
									fontSize: '1.1rem',
									transition: 'all 0.2s',
								}}
								_hover={{ backgroundColor: '#3182CE', color: '#fff' }}
							>
								{icon}
							</Link>
						))}
					</Box>
				</Box>

				{/* Links — Courses */}
				<Box>
					<Text
						style={{
							fontWeight: '700',
							fontSize: '0.85rem',
							letterSpacing: '0.1em',
							color: '#90CDF4',
							marginBottom: '1.25rem',
						}}
					>
						COURSES
					</Text>
					<Box
						style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
					>
						{[
							'Web Development',
							'Python',
							'Mobile Development',
							'Databases',
							'AI & Data Science',
							'Cybersecurity',
						].map((item) => (
							<RouterLink
								key={item}
								to="/courses"
								style={{
									color: '#888',
									fontSize: '0.9rem',
									textDecoration: 'none',
									transition: 'color 0.2s',
								}}
								onMouseEnter={(e) => (e.target.style.color = '#fff')}
								onMouseLeave={(e) => (e.target.style.color = '#888')}
							>
								{item}
							</RouterLink>
						))}
					</Box>
				</Box>

				{/* Links — Company */}
				<Box>
					<Text
						style={{
							fontWeight: '700',
							fontSize: '0.85rem',
							letterSpacing: '0.1em',
							color: '#90CDF4',
							marginBottom: '1.25rem',
						}}
					>
						COMPANY
					</Text>
					<Box
						style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
					>
						{[
							{ label: 'Home', to: '/home' },
							{ label: 'About Us', to: '/about' },
							{ label: 'Courses', to: '/courses' },
							{ label: 'Contact', to: '/contact' },
						].map(({ label, to }) => (
							<RouterLink
								key={label}
								to={to}
								style={{
									color: '#888',
									fontSize: '0.9rem',
									textDecoration: 'none',
								}}
								onMouseEnter={(e) => (e.target.style.color = '#fff')}
								onMouseLeave={(e) => (e.target.style.color = '#888')}
							>
								{label}
							</RouterLink>
						))}
					</Box>
				</Box>

				{/* Newsletter */}
				<Box style={{ maxWidth: '260px' }}>
					<Text
						style={{
							fontWeight: '700',
							fontSize: '0.85rem',
							letterSpacing: '0.1em',
							color: '#90CDF4',
							marginBottom: '1.25rem',
						}}
					>
						STAY UPDATED
					</Text>
					<Text
						style={{
							color: '#888',
							fontSize: '0.9rem',
							marginBottom: '1rem',
							lineHeight: '1.6',
						}}
					>
						Get notified when new courses drop. No spam, ever.
					</Text>

					<Box style={{ display: 'flex', gap: '0.5rem' }}>
						<input
							type="email"
							placeholder="your@email.com"
							style={{
								flex: 1,
								padding: '0.6rem 1rem',
								borderRadius: '999px',
								border: '1px solid rgba(255,255,255,0.12)',
								backgroundColor: 'rgba(255,255,255,0.06)',
								color: '#fff',
								fontSize: '0.85rem',
								outline: 'none',
							}}
						/>
						<button
							style={{
								padding: '0.6rem 1.2rem',
								borderRadius: '999px',
								backgroundColor: '#3182CE',
								color: '#fff',
								fontWeight: '700',
								fontSize: '0.85rem',
								border: 'none',
								cursor: 'pointer',
							}}
						>
							Join
						</button>
					</Box>
				</Box>
			</Box>

			{/* ── Bottom Row ── */}
			<Box
				style={{
					maxWidth: '1100px',
					margin: '0 auto',
					paddingTop: '1.5rem',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<Text style={{ color: '#555', fontSize: '0.85rem' }}>
					© {new Date().getFullYear()} RENX. All rights reserved.
				</Text>

				<Box style={{ display: 'flex', gap: '1.5rem' }}>
					{['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
						(item) => (
							<RouterLink
								key={item}
								to="#"
								style={{
									color: '#555',
									fontSize: '0.8rem',
									textDecoration: 'none',
								}}
								onMouseEnter={(e) => (e.target.style.color = '#fff')}
								onMouseLeave={(e) => (e.target.style.color = '#555')}
							>
								{item}
							</RouterLink>
						),
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Footer
