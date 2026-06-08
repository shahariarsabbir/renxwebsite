// theme.js
import { createSystem, defaultConfig } from '@chakra-ui/react'

export const System = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				brand: {
					mybg: { value: 'linear-gradient(180deg, #0d1635 0%, #0a0f1e 100%)' },
				},
			},
		},
	},
})
