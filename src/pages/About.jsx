import { Box, Heading, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

const team = [
	{
		name: 'Alex Carter',
		role: 'Founder & Lead Instructor',
		emoji: '👨‍💻',
		desc: '10+ years in software engineering. Former Google engineer.',
	},
	{
		name: 'Sara Ahmed',
		role: 'Head of Curriculum',
		emoji: '👩‍🏫',
		desc: 'Education specialist with a passion for making coding accessible.',
	},
	{
		name: 'James Liu',
		role: 'Senior Instructor',
		emoji: '🧑‍💻',
		desc: 'Full-stack developer and open-source contributor.',
	},
]

const About = () => {
	return (
		<Box style={{ backgroundColor: '#0a0f1e', minHeight: '100vh' }}>
			<Navbar />

			{/* Hero */}
			<Box
				style={{
					paddingTop: '8rem',
					paddingBottom: '5rem',
					textAlign: 'center',
					padding: '8rem 2rem 5rem',
					background: 'linear-gradient(180deg, #0d1635 0%, #0a0f1e 100%)',
				}}
			>
				<Box
					style={{
						display: 'inline-block',
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
					ABOUT RENX
				</Box>

				<Heading
					style={{
						color: '#fff',
						fontSize: '3rem',
						fontWeight: '900',
						marginBottom: '1rem',
						lineHeight: '1.2',
					}}
				>
					We Believe Everyone Can{' '}
					<span
						style={{
							background: 'linear-gradient(135deg, #63B3ED, #3182CE)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Learn to Code
					</span>
				</Heading>

				<Text
					style={{
						color: '#888',
						fontSize: '1.05rem',
						maxWidth: '560px',
						margin: '0 auto',
						lineHeight: '1.8',
					}}
				>
					RENX was built with one mission — make high quality programming
					education affordable and accessible to everyone, everywhere.
				</Text>
			</Box>

			{/* Mission */}
			<Box
				style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: '1.5rem',
						marginBottom: '5rem',
					}}
				>
					{[
						{
							icon: '🎯',
							title: 'Our Mission',
							desc: 'Make world-class programming education affordable for everyone — no matter where you are.',
						},
						{
							icon: '👁️',
							title: 'Our Vision',
							desc: 'A world where anyone with an internet connection can build a career in tech.',
						},
						{
							icon: '💡',
							title: 'Our Approach',
							desc: 'Project-based, hands-on learning. Real code, real projects, real skills.',
						},
					].map(({ icon, title, desc }) => (
						<Box
							key={title}
							style={{
								background: 'rgba(255,255,255,0.03)',
								border: '1px solid rgba(255,255,255,0.07)',
								borderRadius: '20px',
								padding: '2rem',
							}}
						>
							<Text style={{ fontSize: '2rem', marginBottom: '1rem' }}>
								{icon}
							</Text>
							<Text
								style={{
									color: '#fff',
									fontWeight: '800',
									fontSize: '1.1rem',
									marginBottom: '0.5rem',
								}}
							>
								{title}
							</Text>
							<Text
								style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.7' }}
							>
								{desc}
							</Text>
						</Box>
					))}
				</div>

				{/* Stats */}
				<Box
					style={{
						background: 'rgba(49,130,206,0.08)',
						border: '1px solid rgba(49,130,206,0.2)',
						borderRadius: '24px',
						padding: '3rem 2rem',
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
						gap: '0',
						marginBottom: '5rem',
					}}
				>
					{[
						{ value: '2020', label: 'Year Founded' },
						{ value: '200+', label: 'Courses' },
						{ value: '50k+', label: 'Students' },
						{ value: '98%', label: 'Satisfaction Rate' },
					].map(({ value, label }, index, arr) => (
						<div
							key={label}
							style={{
								textAlign: 'center',
								padding: '0 3rem',
								borderRight:
									index < arr.length - 1
										? '1px solid rgba(255,255,255,0.08)'
										: 'none',
							}}
						>
							<Text
								style={{
									fontSize: '2.5rem',
									fontWeight: '900',
									background: 'linear-gradient(135deg, #fff, #90CDF4)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
							>
								{value}
							</Text>
							<Text
								style={{
									color: '#666',
									fontSize: '0.85rem',
									marginTop: '0.25rem',
								}}
							>
								{label}
							</Text>
						</div>
					))}
				</Box>

				{/* Team */}
				<Text
					style={{
						color: '#90CDF4',
						fontWeight: '700',
						fontSize: '0.85rem',
						letterSpacing: '0.12em',
						textAlign: 'center',
						marginBottom: '0.5rem',
					}}
				>
					OUR TEAM
				</Text>
				<Heading
					style={{
						color: '#fff',
						fontSize: '2.2rem',
						fontWeight: '900',
						textAlign: 'center',
						marginBottom: '3rem',
					}}
				>
					Meet the People Behind RENX
				</Heading>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
						gap: '1.5rem',
					}}
				>
					{team.map(({ name, role, emoji, desc }) => (
						<Box
							key={name}
							style={{
								background: 'rgba(255,255,255,0.03)',
								border: '1px solid rgba(255,255,255,0.07)',
								borderRadius: '20px',
								padding: '2rem',
								textAlign: 'center',
							}}
						>
							<Text style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
								{emoji}
							</Text>
							<Text
								style={{
									color: '#fff',
									fontWeight: '800',
									fontSize: '1.05rem',
									marginBottom: '0.25rem',
								}}
							>
								{name}
							</Text>
							<Text
								style={{
									color: '#3182CE',
									fontSize: '0.8rem',
									fontWeight: '700',
									marginBottom: '0.75rem',
								}}
							>
								{role}
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
		</Box>
	)
}

export default About
