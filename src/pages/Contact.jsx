import { useState } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

const Contact = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const [sent, setSent] = useState(false)

	const handleSubmit = () => {
		if (form.name && form.email && form.message) setSent(true)
	}

	const inputStyle = {
		width: '100%',
		padding: '0.85rem 1.2rem',
		backgroundColor: 'rgba(255,255,255,0.05)',
		border: '1px solid rgba(255,255,255,0.1)',
		borderRadius: '12px',
		color: '#fff',
		fontSize: '0.95rem',
		outline: 'none',
		transition: 'border 0.2s ease',
		boxSizing: 'border-box',
	}

	return (
		<Box style={{ backgroundColor: '#0a0f1e', minHeight: '100vh' }}>
			<Navbar />

			{/* Hero */}
			<Box
				style={{
					paddingTop: '8rem',
					paddingBottom: '4rem',
					textAlign: 'center',
					background: 'linear-gradient(180deg, #0d1635 0%, #0a0f1e 100%)',
					padding: '8rem 2rem 4rem',
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
					CONTACT US
				</Box>

				<Heading
					style={{
						color: '#fff',
						fontSize: '3rem',
						fontWeight: '900',
						marginBottom: '1rem',
					}}
				>
					Get in{' '}
					<span
						style={{
							background: 'linear-gradient(135deg, #63B3ED, #3182CE)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Touch
					</span>
				</Heading>

				<Text
					style={{
						color: '#888',
						fontSize: '1.05rem',
						maxWidth: '440px',
						margin: '0 auto',
					}}
				>
					Have a question about a course or need help? We're here for you.
				</Text>
			</Box>

			<Box
				style={{
					maxWidth: '1000px',
					margin: '0 auto',
					padding: '4rem 2rem',
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '3rem',
				}}
			>
				{/* Info */}
				<Box>
					<Heading
						style={{
							color: '#fff',
							fontSize: '1.5rem',
							fontWeight: '800',
							marginBottom: '2rem',
						}}
					>
						Contact Information
					</Heading>

					{[
						{ icon: '📧', label: 'Email', value: 'support@renx.dev' },
						{ icon: '💬', label: 'Discord', value: 'discord.gg/renx' },
						{ icon: '🐦', label: 'Twitter', value: '@renxdev' },
						{ icon: '📍', label: 'Location', value: 'Remote — Worldwide' },
					].map(({ icon, label, value }) => (
						<Box
							key={label}
							style={{
								display: 'flex',
								gap: '1rem',
								alignItems: 'flex-start',
								marginBottom: '1.5rem',
							}}
						>
							<Box
								style={{
									width: '44px',
									height: '44px',
									borderRadius: '12px',
									background: 'rgba(49,130,206,0.15)',
									border: '1px solid rgba(49,130,206,0.2)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '1.2rem',
									flexShrink: 0,
								}}
							>
								{icon}
							</Box>
							<div>
								<Text
									style={{
										color: '#555',
										fontSize: '0.75rem',
										fontWeight: '700',
										letterSpacing: '0.08em',
										marginBottom: '0.15rem',
									}}
								>
									{label}
								</Text>
								<Text style={{ color: '#fff', fontSize: '0.95rem' }}>
									{value}
								</Text>
							</div>
						</Box>
					))}
				</Box>

				{/* Form */}
				<Box>
					{sent ? (
						<Box
							style={{
								background: 'rgba(72,187,120,0.1)',
								border: '1px solid rgba(72,187,120,0.3)',
								borderRadius: '20px',
								padding: '3rem',
								textAlign: 'center',
							}}
						>
							<Text style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</Text>
							<Text
								style={{
									color: '#fff',
									fontWeight: '800',
									fontSize: '1.2rem',
									marginBottom: '0.5rem',
								}}
							>
								Message Sent!
							</Text>
							<Text style={{ color: '#888', fontSize: '0.9rem' }}>
								We'll get back to you within 24 hours.
							</Text>
						</Box>
					) : (
						<Box
							style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
						>
							<input
								placeholder="Your Name"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								style={inputStyle}
								onFocus={(e) =>
									(e.target.style.border = '1px solid rgba(49,130,206,0.5)')
								}
								onBlur={(e) =>
									(e.target.style.border = '1px solid rgba(255,255,255,0.1)')
								}
							/>
							<input
								placeholder="Your Email"
								value={form.email}
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								style={inputStyle}
								onFocus={(e) =>
									(e.target.style.border = '1px solid rgba(49,130,206,0.5)')
								}
								onBlur={(e) =>
									(e.target.style.border = '1px solid rgba(255,255,255,0.1)')
								}
							/>
							<input
								placeholder="Subject"
								value={form.subject}
								onChange={(e) => setForm({ ...form, subject: e.target.value })}
								style={inputStyle}
								onFocus={(e) =>
									(e.target.style.border = '1px solid rgba(49,130,206,0.5)')
								}
								onBlur={(e) =>
									(e.target.style.border = '1px solid rgba(255,255,255,0.1)')
								}
							/>
							<textarea
								placeholder="Your Message"
								rows={5}
								value={form.message}
								onChange={(e) => setForm({ ...form, message: e.target.value })}
								style={{ ...inputStyle, resize: 'vertical' }}
								onFocus={(e) =>
									(e.target.style.border = '1px solid rgba(49,130,206,0.5)')
								}
								onBlur={(e) =>
									(e.target.style.border = '1px solid rgba(255,255,255,0.1)')
								}
							/>
							<Box
								onClick={handleSubmit}
								style={{
									background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
									color: '#fff',
									padding: '0.9rem',
									borderRadius: '12px',
									fontWeight: '700',
									fontSize: '1rem',
									textAlign: 'center',
									cursor: 'pointer',
									boxShadow: '0 8px 24px rgba(49,130,206,0.35)',
									transition: 'all 0.3s ease',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-2px)'
									e.currentTarget.style.boxShadow =
										'0 12px 32px rgba(49,130,206,0.5)'
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0)'
									e.currentTarget.style.boxShadow =
										'0 8px 24px rgba(49,130,206,0.35)'
								}}
							>
								Send Message →
							</Box>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Contact
