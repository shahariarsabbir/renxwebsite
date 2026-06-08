import { Box, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { courses, levelColor } from '../data/CourseData.js'

const Stars = ({ rating }) => (
	<span style={{ color: '#F6AD55', fontSize: '0.85rem' }}>
		{'★'.repeat(Math.floor(rating))}
		{rating % 1 >= 0.5 ? '½' : ''}
		{'☆'.repeat(5 - Math.ceil(rating))}
	</span>
)

const Courses = () => {
	const navigate = useNavigate()

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
					borderBottom: '1px solid rgba(255,255,255,0.06)',
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
						fontWeight: 700,
						letterSpacing: '0.12em',
						marginBottom: '1.25rem',
					}}
				>
					ALL COURSES
				</Box>

				<Heading
					style={{
						color: '#fff',
						fontSize: '3rem',
						fontWeight: 900,
						marginBottom: '1rem',
					}}
				>
					Find Your{' '}
					<span
						style={{
							background: 'linear-gradient(135deg, #63B3ED, #3182CE)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Perfect Course
					</span>
				</Heading>

				<Text
					style={{
						color: '#888',
						fontSize: '1.05rem',
						maxWidth: '480px',
						margin: '0 auto',
					}}
				>
					Browse all programming courses. Pay once, own forever.
				</Text>
			</Box>

			{/* Grid */}
			<Box
				style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
						gap: '1.5rem',
					}}
				>
					{courses.map((course) => (
						<Box
							key={course.id}
							style={{
								background: 'rgba(255,255,255,0.03)',
								border: '1px solid rgba(255,255,255,0.07)',
								borderRadius: '20px',
								padding: '2rem',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								display: 'flex',
								flexDirection: 'column',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px)'
								e.currentTarget.style.border = '1px solid rgba(49,130,206,0.35)'
								e.currentTarget.style.boxShadow =
									'0 12px 40px rgba(49,130,206,0.15)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)'
								e.currentTarget.style.border =
									'1px solid rgba(255,255,255,0.07)'
								e.currentTarget.style.boxShadow = 'none'
							}}
						>
							{/* Icon + level */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '1.25rem',
								}}
							>
								<div
									style={{
										width: '52px',
										height: '52px',
										borderRadius: '14px',
										background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '1.5rem',
									}}
								>
									{course.icon}
								</div>
								<span
									style={{
										padding: '0.25rem 0.75rem',
										borderRadius: '999px',
										fontSize: '0.75rem',
										fontWeight: 700,
										backgroundColor: levelColor[course.level].bg,
										color: levelColor[course.level].color,
									}}
								>
									{course.level}
								</span>
							</div>

							<Text
								style={{
									color: '#fff',
									fontWeight: 800,
									fontSize: '1.1rem',
									marginBottom: '0.4rem',
								}}
							>
								{course.title}
							</Text>
							<Text
								style={{
									color: '#666',
									fontSize: '0.875rem',
									lineHeight: 1.7,
									marginBottom: '1rem',
									flex: 1,
								}}
							>
								{course.desc}
							</Text>

							{/* Rating */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.4rem',
									marginBottom: '1rem',
								}}
							>
								<Stars rating={course.rating} />
								<span
									style={{
										color: '#F6AD55',
										fontSize: '0.8rem',
										fontWeight: 700,
									}}
								>
									{course.rating}
								</span>
								<span style={{ color: '#555', fontSize: '0.75rem' }}>
									({course.students.toLocaleString()})
								</span>
							</div>

							{/* Meta */}
							<div
								style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}
							>
								<Text style={{ color: '#555', fontSize: '0.8rem' }}>
									📚 {course.lessons} lessons
								</Text>
								<Text style={{ color: '#555', fontSize: '0.8rem' }}>
									⏱ {course.hours}h
								</Text>
							</div>

							{/* Price + CTA */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<span
									style={{
										fontSize: '1.5rem',
										fontWeight: 900,
										background: 'linear-gradient(135deg, #fff, #90CDF4)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
									}}
								>
									${course.price}
								</span>

								<button
									onClick={() => navigate(`/courses/${course.id}`)}
									style={{
										padding: '0.5rem 1.25rem',
										borderRadius: '999px',
										border: 'none',
										background: 'linear-gradient(135deg, #3182CE, #63B3ED)',
										color: '#fff',
										fontWeight: 700,
										fontSize: '0.85rem',
										cursor: 'pointer',
										boxShadow: '0 4px 14px rgba(49,130,206,0.3)',
										transition: 'all 0.2s ease',
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-1px)'
										e.currentTarget.style.boxShadow =
											'0 6px 20px rgba(49,130,206,0.5)'
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0)'
										e.currentTarget.style.boxShadow =
											'0 4px 14px rgba(49,130,206,0.3)'
									}}
								>
									Enroll Now →
								</button>
							</div>
						</Box>
					))}
				</div>
			</Box>
		</Box>
	)
}

export default Courses
