import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { System } from './Theme'

export function Provider(props) {
	return <ChakraProvider value={System}>{props.children}</ChakraProvider>
}
