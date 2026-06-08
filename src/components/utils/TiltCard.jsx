// src/chakraframer/components/utils/TiltCardUtil.jsx
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Box } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

export default function TiltCardUtil({ children, bgGradient }) {
	const ref = useRef(null)
	const [hovered, setHovered] = useState(false)

	const x = useMotionValue(0.5)
	const y = useMotionValue(0.5)

	// 👇 spring makes rotation feel smooth and bouncy
	const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }

	const rotateXRaw = useTransform(y, [0, 1], [20, -20]) // 👈 stronger: was 15
	const rotateYRaw = useTransform(x, [0, 1], [-20, 20]) // 👈 stronger: was 15

	const rotateX = useSpring(rotateXRaw, springConfig) // 👈 spring applied
	const rotateY = useSpring(rotateYRaw, springConfig) // 👈 spring applied

	// 👇 subtle shine that moves with mouse
	const shineX = useTransform(x, [0, 1], [-50, 150])
	const shineY = useTransform(y, [0, 1], [-50, 150])

	const handleMouseMove = (e) => {
		const rect = ref.current.getBoundingClientRect()
		x.set((e.clientX - rect.left) / rect.width)
		y.set((e.clientY - rect.top) / rect.height)
	}

	const handleMouseLeave = () => {
		x.set(0.5)
		y.set(0.5)
		setHovered(false)
	}

	const handleMouseEnter = () => setHovered(true)

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			style={{
				perspective: 1200, // 👈 deeper perspective: was 1000
				display: 'inline-block',
			}}
		>
			<Box
				as={motion.div}
				bgGradient={bgGradient}
				p={2} // 👈 reduced padding: was p={10}
				rounded="2xl"
				position="relative"
				overflow="hidden"
				style={{
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
					// 👇 glowing shadow that appears on hover
					boxShadow: hovered
						? '0 40px 80px rgba(49,130,206,0.5), 0 0 40px rgba(49,130,206,0.3)'
						: '0 20px 40px rgba(0,0,0,0.3)',
					transition: 'box-shadow 0.3s ease',
				}}
			>
				{/* 👇 moving shine overlay */}
				<motion.div
					style={{
						position: 'absolute',
						top: shineY,
						left: shineX,
						width: '200px',
						height: '200px',
						borderRadius: '50%',
						background:
							'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
						pointerEvents: 'none',
						zIndex: 10,
						opacity: hovered ? 1 : 0,
						transition: 'opacity 0.3s ease',
					}}
				/>

				{children}
			</Box>
		</motion.div>
	)
}
