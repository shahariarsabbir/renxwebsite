'use client'
import TiltCardUtil from './TiltCard'
import { Box, Center, Text } from '@chakra-ui/react'

export default function Card3d({ image, title, desc, icon }) {
	// 👈 add desc and icon
	return (
		<Center p={20} w="full">
			<TiltCardUtil bgGradient="linear(to-br, blue.900, blue.500)">
				<Box
					w="320px"
					h="420px"
					bg="white"
					borderRadius="2xl"
					overflow="hidden"
					position="relative"
				>
					{/* Image */}
					<Box as="img" src={image} w="full" h="60%" objectFit="cover" />

					{/* Icon badge */}
					<Box
						position="absolute"
						top="3"
						left="3"
						bg="rgba(0,0,0,0.5)"
						borderRadius="full"
						px={3}
						py={1}
					>
						<Text fontSize="xl">{icon}</Text>
					</Box>

					{/* Title and desc */}
					<Box px={4} pt={3}>
						<Text fontWeight="800" fontSize="lg" mb={1}>
							{title}
						</Text>
						<Text fontSize="sm" color="gray.500">
							{desc} {/* 👈 now works because it's in props */}
						</Text>
					</Box>
				</Box>
			</TiltCardUtil>
		</Center>
	)
}
