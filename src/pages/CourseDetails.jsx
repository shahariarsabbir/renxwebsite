import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { courses, levelColor } from '../data/CourseData.js'

/* ── tiny helpers ───────────────────────────────────────────── */
const Stars = ({ rating }) => (
	<span style={{ color: '#F6AD55', fontSize: '0.9rem' }}>
		{'★'.repeat(Math.floor(rating))}
		{rating % 1 >= 0.5 ? '½' : ''}
		{'☆'.repeat(5 - Math.ceil(rating))}
	</span>
)

const CheckItem = ({ text }) => (
	<div
		style={{
			display: 'flex',
			gap: '0.65rem',
			alignItems: 'flex-start',
			background: 'rgba(255,255,255,0.03)',
			border: '1px solid rgba(255,255,255,0.06)',
			borderRadius: '10px',
			padding: '0.75rem 1rem',
		}}
	>
		<span
			style={{
				color: '#48BB78',
				flexShrink: 0,
				marginTop: '1px',
				fontSize: '0.9rem',
			}}
		>
			✓
		</span>
		<span
			style={{
				color: 'rgba(255,255,255,0.75)',
				fontSize: '0.875rem',
				lineHeight: 1.6,
			}}
		>
			{text}
		</span>
	</div>
)

/* ── Enroll modal ───────────────────────────────────────────── */
const EnrollModal = ({ course, onClose, onSuccess }) => {
	const [step, setStep] = useState(1) // 1 = form, 2 = payment, 3 = success
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({
		name: '',
		email: '',
		card: '',
		expiry: '',
		cvv: '',
	})
	const [errors, setErrors] = useState({})

	const validate = () => {
		const e = {}
		if (!form.name.trim()) e.name = 'Full name is required'
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
			e.email = 'Valid email required'
		if (step === 2) {
			if (!/^\d{16}$/.test(form.card.replace(/\s/g, '')))
				e.card = 'Enter a valid 16-digit card number'
			if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format: MM/YY'
			if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = 'Enter 3–4 digit CVV'
		}
		setErrors(e)
		return Object.keys(e).length === 0
	}

	const handleNext = () => {
		if (!validate()) return
		setStep(2)
	}

	const handlePay = async () => {
		if (!validate()) return
		setLoading(true)
		// Simulate payment processing (replace with real Stripe/payment call)
		await new Promise((r) => setTimeout(r, 1800))
		setLoading(false)
		setStep(3)
		setTimeout(onSuccess, 2500)
	}

	const field = (key, label, placeholder, type = 'text') => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
			<label
				style={{
					color: 'rgba(255,255,255,0.55)',
					fontSize: '0.78rem',
					fontWeight: 600,
					letterSpacing: '0.05em',
				}}
			>
				{label}
			</label>
			<input
				type={type}
				placeholder={placeholder}
				value={form[key]}
				onChange={(e) => {
					let val = e.target.value
					// auto-format card number
					if (key === 'card')
						val = val
							.replace(/\D/g, '')
							.slice(0, 16)
							.replace(/(.{4})/g, '$1 ')
							.trim()
					// auto-format expiry
					if (key === 'expiry')
						val = val
							.replace(/\D/g, '')
							.slice(0, 4)
							.replace(/(\d{2})(\d)/, '$1/$2')
					if (key === 'cvv') val = val.replace(/\D/g, '').slice(0, 4)
					setForm((f) => ({ ...f, [key]: val }))
					setErrors((er) => ({ ...er, [key]: '' }))
				}}
				style={{
					backgroundColor: 'rgba(255,255,255,0.05)',
					border: `1px solid ${errors[key] ? '#F56565' : 'rgba(255,255,255,0.1)'}`,
					borderRadius: '10px',
					padding: '0.75rem 1rem',
					color: '#fff',
					fontSize: '0.9rem',
					outline: 'none',
					transition: 'border-color 0.2s',
				}}
				onFocus={(e) => {
					e.target.style.borderColor = '#3182CE'
				}}
				onBlur={(e) => {
					e.target.style.borderColor = errors[key]
						? '#F56565'
						: 'rgba(255,255,255,0.1)'
				}}
			/>
			{errors[key] && (
				<span style={{ color: '#F56565', fontSize: '0.75rem' }}>
					{errors[key]}
				</span>
			)}
		</div>
	)

	return (
		<div
			onClick={step !== 3 ? onClose : undefined}
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 3000,
				backgroundColor: 'rgba(0,0,0,0.8)',
				backdropFilter: 'blur(8px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '1rem',
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					width: '100%',
					maxWidth: '480px',
					backgroundColor: '#0d1635',
					border: '1px solid rgba(49,130,206,0.25)',
					borderRadius: '24px',
					boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
					overflow: 'hidden',
					animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
				}}
			>
				{/* Modal header */}
				<div
					style={{
						background: 'linear-gradient(135deg, #142850, #0d1635)',
						padding: '1.5rem 2rem',
						borderBottom: '1px solid rgba(255,255,255,0.06)',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div>
						<div
							style={{
								color: 'rgba(255,255,255,0.4)',
								fontSize: '0.75rem',
								fontWeight: 600,
								marginBottom: '0.2rem',
							}}
						>
							{step === 1
								? 'STEP 1 OF 2 — YOUR INFO'
								: step === 2
									? 'STEP 2 OF 2 — PAYMENT'
									: 'ENROLLED!'}
						</div>
						<div
							style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}
						>
							{step === 3 ? '🎉 Welcome aboard!' : course.title}
						</div>
					</div>
					{step !== 3 && (
						<button
							onClick={onClose}
							style={{
								background: 'rgba(255,255,255,0.07)',
								border: '1px solid rgba(255,255,255,0.1)',
								borderRadius: '8px',
								color: 'rgba(255,255,255,0.5)',
								width: '34px',
								height: '34px',
								cursor: 'pointer',
								fontSize: '0.9rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							✕
						</button>
					)}
				</div>

				{/* Step indicator */}
				{step !== 3 && (
					<div style={{ display: 'flex', height: '3px' }}>
						<div style={{ flex: 1, backgroundColor: '#3182CE' }} />
						<div
							style={{
								flex: 1,
								backgroundColor:
									step === 2 ? '#3182CE' : 'rgba(255,255,255,0.08)',
							}}
						/>
					</div>
				)}

				<div style={{ padding: '2rem' }}>
					{/* ── STEP 1: Personal info ── */}
					{step === 1 && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1.25rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									background: 'rgba(49,130,206,0.08)',
									border: '1px solid rgba(49,130,206,0.2)',
									borderRadius: '12px',
									padding: '0.875rem 1rem',
									marginBottom: '0.25rem',
								}}
							>
								<span
									style={{
										color: 'rgba(255,255,255,0.7)',
										fontSize: '0.875rem',
									}}
								>
									{course.icon} {course.title}
								</span>
								<span
									style={{
										fontSize: '1.25rem',
										fontWeight: 900,
										background: 'linear-gradient(135deg, #fff, #90CDF4)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
									}}
								>
									${course.price}
								</span>
							</div>
							{field('name', 'Full Name', 'John Doe')}
							{field('email', 'Email Address', 'john@example.com', 'email')}
							<button
								onClick={handleNext}
								style={{
									marginTop: '0.5rem',
									padding: '0.875rem',
									borderRadius: '12px',
									border: 'none',
									background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
									color: '#fff',
									fontWeight: 700,
									fontSize: '1rem',
									cursor: 'pointer',
									boxShadow: '0 4px 16px rgba(49,130,206,0.4)',
									transition: 'all 0.2s',
								}}
							>
								Continue to Payment →
							</button>
						</div>
					)}

					{/* ── STEP 2: Payment ── */}
					{step === 2 && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1.25rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									color: 'rgba(255,255,255,0.35)',
									fontSize: '0.78rem',
									marginBottom: '0.25rem',
								}}
							>
								<span>🔒</span> Payments are encrypted and secure
							</div>

							{field('card', 'Card Number', '1234 5678 9012 3456')}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr',
									gap: '1rem',
								}}
							>
								{field('expiry', 'Expiry', 'MM/YY')}
								{field('cvv', 'CVV', '123')}
							</div>

							{/* Order summary */}
							<div
								style={{
									background: 'rgba(255,255,255,0.03)',
									border: '1px solid rgba(255,255,255,0.07)',
									borderRadius: '12px',
									padding: '1rem',
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										color: 'rgba(255,255,255,0.5)',
										fontSize: '0.85rem',
									}}
								>
									<span>{course.title}</span>
									<span>${course.price}.00</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										color: 'rgba(255,255,255,0.3)',
										fontSize: '0.8rem',
									}}
								>
									<span>Tax</span>
									<span>$0.00</span>
								</div>
								<div
									style={{
										height: '1px',
										backgroundColor: 'rgba(255,255,255,0.07)',
										margin: '0.25rem 0',
									}}
								/>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										color: '#fff',
										fontWeight: 800,
										fontSize: '1rem',
									}}
								>
									<span>Total</span>
									<span
										style={{
											background: 'linear-gradient(135deg, #fff, #90CDF4)',
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
										}}
									>
										${course.price}.00
									</span>
								</div>
							</div>

							<div style={{ display: 'flex', gap: '0.75rem' }}>
								<button
									onClick={() => setStep(1)}
									style={{
										flex: '0 0 auto',
										padding: '0.875rem 1.25rem',
										borderRadius: '12px',
										border: '1px solid rgba(255,255,255,0.1)',
										background: 'transparent',
										color: 'rgba(255,255,255,0.5)',
										fontWeight: 600,
										fontSize: '0.9rem',
										cursor: 'pointer',
									}}
								>
									← Back
								</button>
								<button
									onClick={handlePay}
									disabled={loading}
									style={{
										flex: 1,
										padding: '0.875rem',
										borderRadius: '12px',
										border: 'none',
										background: loading
											? 'rgba(49,130,206,0.4)'
											: 'linear-gradient(135deg, #3182CE, #63B3ED)',
										color: '#fff',
										fontWeight: 700,
										fontSize: '1rem',
										cursor: loading ? 'not-allowed' : 'pointer',
										boxShadow: '0 4px 16px rgba(49,130,206,0.4)',
										transition: 'all 0.2s',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '0.5rem',
									}}
								>
									{loading ? (
										<>
											<span
												style={{
													width: '16px',
													height: '16px',
													border: '2px solid rgba(255,255,255,0.3)',
													borderTop: '2px solid #fff',
													borderRadius: '50%',
													animation: 'spin 0.8s linear infinite',
													display: 'inline-block',
												}}
											/>
											Processing…
										</>
									) : (
										`Pay $${course.price}.00`
									)}
								</button>
							</div>
						</div>
					)}

					{/* ── STEP 3: Success ── */}
					{step === 3 && (
						<div style={{ textAlign: 'center', padding: '1rem 0 0.5rem' }}>
							<div
								style={{
									width: '72px',
									height: '72px',
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #276749, #48BB78)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '2rem',
									margin: '0 auto 1.25rem',
									boxShadow: '0 8px 24px rgba(72,187,120,0.4)',
									animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
								}}
							>
								✓
							</div>
							<h3
								style={{
									color: '#fff',
									fontWeight: 900,
									fontSize: '1.3rem',
									margin: '0 0 0.5rem',
								}}
							>
								You're enrolled!
							</h3>
							<p
								style={{
									color: '#666',
									fontSize: '0.875rem',
									lineHeight: 1.6,
									margin: '0 0 1.5rem',
								}}
							>
								A confirmation has been sent to{' '}
								<strong style={{ color: '#90CDF4' }}>{form.email}</strong>.
								<br />
								Your course is now unlocked and ready.
							</p>
							<div
								style={{
									background: 'rgba(72,187,120,0.08)',
									border: '1px solid rgba(72,187,120,0.2)',
									borderRadius: '12px',
									padding: '0.875rem 1rem',
									color: '#9AE6B4',
									fontSize: '0.82rem',
									lineHeight: 1.5,
								}}
							>
								🏆 Certificate of completion · Lifetime access · Discord
								community
							</div>
						</div>
					)}
				</div>
			</div>

			<style>{`
				@keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
				@keyframes spin    { to { transform: rotate(360deg) } }
				@keyframes popIn   { from { transform: scale(0.5); opacity:0 } to { transform: scale(1); opacity:1 } }
			`}</style>
		</div>
	)
}

/* ── CourseDetail Page ───────────────────────────────────────── */
const CourseDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const course = courses.find((c) => c.id === id)

	const [activeTab, setActiveTab] = useState('overview')
	const [expandedSection, setExpandedSection] = useState(null)
	const [showEnrollModal, setShowEnrollModal] = useState(false)
	const [isEnrolled, setIsEnrolled] = useState(false)

	if (!course)
		return (
			<Box
				style={{
					backgroundColor: '#0a0f1e',
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Navbar />
				<div style={{ textAlign: 'center', color: '#fff' }}>
					<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
					<h2>Course not found</h2>
					<button
						onClick={() => navigate('/courses')}
						style={{
							marginTop: '1rem',
							padding: '0.75rem 2rem',
							borderRadius: '999px',
							border: 'none',
							background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
							color: '#fff',
							fontWeight: 700,
							cursor: 'pointer',
						}}
					>
						← Back to Courses
					</button>
				</div>
			</Box>
		)

	const tabs = ['overview', 'curriculum', 'requirements']

	return (
		<Box style={{ backgroundColor: '#0a0f1e', minHeight: '100vh' }}>
			<Navbar />

			{/* ── Hero Banner ── */}
			<div
				style={{
					background:
						'linear-gradient(160deg, #0d1635 0%, #142850 50%, #0a0f1e 100%)',
					borderBottom: '1px solid rgba(255,255,255,0.06)',
					paddingTop: '6.5rem',
					paddingBottom: '3rem',
				}}
			>
				<div
					style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}
				>
					{/* Breadcrumb */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
							marginBottom: '1.75rem',
							fontSize: '0.8rem',
						}}
					>
						<button
							onClick={() => navigate('/courses')}
							style={{
								background: 'none',
								border: 'none',
								color: '#3182CE',
								cursor: 'pointer',
								fontWeight: 600,
								padding: 0,
								fontSize: '0.8rem',
							}}
						>
							← All Courses
						</button>
						<span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
						<span style={{ color: 'rgba(255,255,255,0.4)' }}>
							{course.title}
						</span>
					</div>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr auto',
							gap: '3rem',
							alignItems: 'start',
						}}
					>
						{/* Left: course info */}
						<div>
							<div
								style={{
									display: 'flex',
									gap: '0.6rem',
									flexWrap: 'wrap',
									marginBottom: '1rem',
								}}
							>
								<span
									style={{
										padding: '0.25rem 0.85rem',
										borderRadius: '999px',
										fontSize: '0.75rem',
										fontWeight: 700,
										backgroundColor: levelColor[course.level].bg,
										color: levelColor[course.level].color,
									}}
								>
									{course.level}
								</span>
								{course.certificate && (
									<span
										style={{
											padding: '0.25rem 0.85rem',
											borderRadius: '999px',
											fontSize: '0.75rem',
											fontWeight: 700,
											backgroundColor: 'rgba(154,230,180,0.1)',
											color: '#9AE6B4',
										}}
									>
										🏆 Certificate
									</span>
								)}
							</div>

							<h1
								style={{
									color: '#fff',
									fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
									fontWeight: 900,
									margin: '0 0 1rem',
									lineHeight: 1.15,
								}}
							>
								{course.icon} {course.title}
							</h1>

							<p
								style={{
									color: '#888',
									fontSize: '1.05rem',
									lineHeight: 1.7,
									marginBottom: '1.5rem',
									maxWidth: '560px',
								}}
							>
								{course.desc}
							</p>

							{/* Rating row */}
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '1.25rem',
									fontSize: '0.85rem',
									color: 'rgba(255,255,255,0.45)',
								}}
							>
								<span>
									<Stars rating={course.rating} />{' '}
									<strong style={{ color: '#F6AD55' }}>{course.rating}</strong>{' '}
									({course.students.toLocaleString()} students)
								</span>
								<span>👨‍🏫 {course.instructor}</span>
								<span>
									🕐 {course.hours}h · {course.lessons} lessons
								</span>
								<span>🌍 {course.language}</span>
								<span>🔄 {course.lastUpdated}</span>
							</div>
						</div>

						{/* Right: price card (hidden on mobile — shown in sticky bar) */}
						<div
							style={{
								background: 'rgba(13,22,53,0.95)',
								border: '1px solid rgba(49,130,206,0.2)',
								borderRadius: '20px',
								padding: '2rem',
								minWidth: '260px',
								position: 'sticky',
								top: '90px',
								boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
							}}
							className="renx-price-card"
						>
							<div
								style={{
									fontSize: '2.5rem',
									fontWeight: 900,
									marginBottom: '0.25rem',
									background: 'linear-gradient(135deg, #fff, #90CDF4)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
							>
								${course.price}
							</div>
							<div
								style={{
									color: 'rgba(255,255,255,0.3)',
									fontSize: '0.78rem',
									marginBottom: '1.5rem',
								}}
							>
								One-time · Lifetime access
							</div>

							<button
								onClick={() => !isEnrolled && setShowEnrollModal(true)}
								style={{
									width: '100%',
									padding: '0.9rem',
									borderRadius: '12px',
									border: 'none',
									background: isEnrolled
										? 'linear-gradient(135deg, #276749, #48BB78)'
										: 'linear-gradient(135deg, #3182CE, #63B3ED)',
									color: '#fff',
									fontWeight: 800,
									fontSize: '1rem',
									cursor: isEnrolled ? 'default' : 'pointer',
									boxShadow: isEnrolled
										? '0 4px 16px rgba(72,187,120,0.4)'
										: '0 4px 16px rgba(49,130,206,0.4)',
									marginBottom: '1.25rem',
									transition: 'all 0.3s',
								}}
							>
								{isEnrolled ? '✓ Enrolled!' : '⚡ Enroll Now'}
							</button>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}
							>
								{course.includes.map((item, i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											gap: '0.5rem',
											color: 'rgba(255,255,255,0.5)',
											fontSize: '0.8rem',
										}}
									>
										<span style={{ color: '#3182CE', flexShrink: 0 }}>▸</span>{' '}
										{item}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ── Tabs ── */}
			<div
				style={{
					borderBottom: '1px solid rgba(255,255,255,0.06)',
					backgroundColor: '#0a0f1e',
					position: 'sticky',
					top: '64px',
					zIndex: 100,
				}}
			>
				<div
					style={{
						maxWidth: '1100px',
						margin: '0 auto',
						padding: '0 2rem',
						display: 'flex',
						gap: '0.25rem',
					}}
				>
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							style={{
								padding: '1rem 1.25rem',
								background: 'none',
								border: 'none',
								borderBottom: `2px solid ${activeTab === tab ? '#3182CE' : 'transparent'}`,
								color: activeTab === tab ? '#90CDF4' : 'rgba(255,255,255,0.4)',
								fontWeight: activeTab === tab ? 700 : 500,
								fontSize: '0.875rem',
								cursor: 'pointer',
								transition: 'all 0.2s',
								textTransform: 'capitalize',
							}}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			{/* ── Tab Content ── */}
			<div
				style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem' }}
			>
				{/* OVERVIEW */}
				{activeTab === 'overview' && (
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
					>
						<div>
							<h2
								style={{
									color: '#fff',
									fontWeight: 800,
									fontSize: '1.15rem',
									marginBottom: '1.25rem',
								}}
							>
								✅ What You'll Learn
							</h2>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
									gap: '0.65rem',
								}}
							>
								{course.whatYouLearn.map((item, i) => (
									<CheckItem key={i} text={item} />
								))}
							</div>
						</div>

						<div>
							<h2
								style={{
									color: '#fff',
									fontWeight: 800,
									fontSize: '1.15rem',
									marginBottom: '1.25rem',
								}}
							>
								👨‍🏫 Your Instructor
							</h2>
							<div
								style={{
									background: 'rgba(255,255,255,0.03)',
									border: '1px solid rgba(255,255,255,0.07)',
									borderRadius: '16px',
									padding: '1.5rem',
									display: 'flex',
									gap: '1rem',
									alignItems: 'center',
								}}
							>
								<div
									style={{
										width: '60px',
										height: '60px',
										borderRadius: '50%',
										flexShrink: 0,
										background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '1.5rem',
										fontWeight: 900,
										color: '#fff',
									}}
								>
									{course.instructor.charAt(0)}
								</div>
								<div>
									<div
										style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}
									>
										{course.instructor}
									</div>
									<div
										style={{
											color: '#666',
											fontSize: '0.8rem',
											marginTop: '0.2rem',
										}}
									>
										{course.instructorRole}
									</div>
									<div
										style={{
											display: 'flex',
											gap: '0.75rem',
											marginTop: '0.5rem',
											fontSize: '0.78rem',
											color: '#555',
										}}
									>
										<span>⭐ {course.rating} rating</span>
										<span>👨‍🎓 {course.students.toLocaleString()} students</span>
										<span>📚 {course.lessons} lessons</span>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h2
								style={{
									color: '#fff',
									fontWeight: 800,
									fontSize: '1.15rem',
									marginBottom: '1.25rem',
								}}
							>
								📦 This Course Includes
							</h2>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}
							>
								{course.includes.map((item, i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											gap: '0.6rem',
											color: 'rgba(255,255,255,0.6)',
											fontSize: '0.875rem',
											padding: '0.4rem 0',
										}}
									>
										<span style={{ color: '#3182CE' }}>▸</span> {item}
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* CURRICULUM */}
				{activeTab === 'curriculum' && (
					<div>
						<h2
							style={{
								color: '#fff',
								fontWeight: 800,
								fontSize: '1.15rem',
								marginBottom: '0.5rem',
							}}
						>
							📚 Course Curriculum
						</h2>
						<p
							style={{
								color: '#555',
								fontSize: '0.85rem',
								marginBottom: '1.5rem',
							}}
						>
							{course.lessons} lessons · {course.hours} total hours
						</p>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.75rem',
							}}
						>
							{course.curriculum.map((sec, i) => (
								<div
									key={i}
									style={{
										background: 'rgba(255,255,255,0.03)',
										border: '1px solid rgba(255,255,255,0.07)',
										borderRadius: '14px',
										overflow: 'hidden',
									}}
								>
									<button
										onClick={() =>
											setExpandedSection(expandedSection === i ? null : i)
										}
										style={{
											width: '100%',
											background: 'none',
											border: 'none',
											padding: '1.1rem 1.25rem',
											cursor: 'pointer',
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<span
											style={{
												color: '#fff',
												fontWeight: 700,
												fontSize: '0.9rem',
												textAlign: 'left',
											}}
										>
											Section {i + 1}: {sec.section}
										</span>
										<span
											style={{
												color: '#555',
												fontSize: '0.8rem',
												display: 'flex',
												gap: '0.75rem',
												alignItems: 'center',
												flexShrink: 0,
											}}
										>
											<span>
												{sec.lessons} lessons · {sec.duration}
											</span>
											<span
												style={{
													color: '#3182CE',
													fontSize: '1rem',
													transform:
														expandedSection === i ? 'rotate(180deg)' : 'none',
													transition: 'transform 0.2s',
													display: 'inline-block',
												}}
											>
												▾
											</span>
										</span>
									</button>
									{expandedSection === i && (
										<div
											style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
										>
											{Array.from({ length: sec.lessons }, (_, j) => (
												<div
													key={j}
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														padding: '0.65rem 1.25rem',
														borderBottom:
															j < sec.lessons - 1
																? '1px solid rgba(255,255,255,0.04)'
																: 'none',
														color: 'rgba(255,255,255,0.45)',
														fontSize: '0.82rem',
													}}
												>
													<span>
														▷ &nbsp;{sec.section} — Part {j + 1}
													</span>
													<span>{Math.floor(Math.random() * 15 + 5)} min</span>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* REQUIREMENTS */}
				{activeTab === 'requirements' && (
					<div>
						<h2
							style={{
								color: '#fff',
								fontWeight: 800,
								fontSize: '1.15rem',
								marginBottom: '1.25rem',
							}}
						>
							📋 Requirements
						</h2>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.75rem',
							}}
						>
							{course.requirements.map((req, i) => (
								<div
									key={i}
									style={{
										display: 'flex',
										gap: '0.75rem',
										alignItems: 'flex-start',
										background: 'rgba(255,255,255,0.03)',
										border: '1px solid rgba(255,255,255,0.06)',
										borderRadius: '12px',
										padding: '1rem',
										color: 'rgba(255,255,255,0.7)',
										fontSize: '0.875rem',
									}}
								>
									<span style={{ color: '#63B3ED', flexShrink: 0 }}>◈</span>{' '}
									{req}
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* ── Mobile sticky enroll bar ── */}
			<div
				style={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: 'rgba(10,15,30,0.97)',
					backdropFilter: 'blur(12px)',
					borderTop: '1px solid rgba(255,255,255,0.07)',
					padding: '1rem 1.5rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '1rem',
					zIndex: 200,
				}}
				className="renx-mobile-enroll-bar"
			>
				<div>
					<div
						style={{
							fontSize: '1.5rem',
							fontWeight: 900,
							background: 'linear-gradient(135deg, #fff, #90CDF4)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						${course.price}
					</div>
					<div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
						Lifetime access
					</div>
				</div>
				<button
					onClick={() => !isEnrolled && setShowEnrollModal(true)}
					style={{
						padding: '0.75rem 2rem',
						borderRadius: '999px',
						border: 'none',
						background: isEnrolled
							? 'linear-gradient(135deg, #276749, #48BB78)'
							: 'linear-gradient(135deg, #3182CE, #63B3ED)',
						color: '#fff',
						fontWeight: 800,
						fontSize: '0.95rem',
						cursor: isEnrolled ? 'default' : 'pointer',
						boxShadow: '0 4px 16px rgba(49,130,206,0.4)',
						transition: 'all 0.3s',
					}}
				>
					{isEnrolled ? '✓ Enrolled!' : '⚡ Enroll Now'}
				</button>
			</div>

			{/* spacer so sticky bar doesn't overlap content */}
			<div style={{ height: '80px' }} />

			{/* ── Enroll modal ── */}
			{showEnrollModal && (
				<EnrollModal
					course={course}
					onClose={() => setShowEnrollModal(false)}
					onSuccess={() => {
						setIsEnrolled(true)
						setShowEnrollModal(false)
					}}
				/>
			)}

			<style>{`
				/* Hide desktop price card on mobile, show sticky bar */
				@media (max-width: 768px) {
					.renx-price-card { display: none !important; }
				}
				/* Hide sticky bar on desktop */
				@media (min-width: 769px) {
					.renx-mobile-enroll-bar { display: none !important; }
				}
			`}</style>
		</Box>
	)
}

export default CourseDetail
