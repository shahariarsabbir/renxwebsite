import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import CourseDetail from './pages/CourseDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import Courses from './pages/Courses'
import About from './pages/About'
import Contact from './pages/Contact'

const Layout = ({ children }) => (
	<Box minH="100vh" bg="var(--chakra-colors-brand-mybg)">
		{children}
		<Footer />
	</Box>
)

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Home — your existing Header (has Navbar + Hero + all sections) */}
				<Route
					path="/"
					element={
						<Layout>
							<Header />
						</Layout>
					}
				/>
				<Route
					path="/home"
					element={
						<Layout>
							<Header />
						</Layout>
					}
				/>

				{/* Other pages */}
				<Route
					path="/courses"
					element={
						<Layout>
							<Courses />
						</Layout>
					}
				/>
				<Route
					path="/about"
					element={
						<Layout>
							<About />
						</Layout>
					}
				/>
				<Route
					path="/contact"
					element={
						<Layout>
							<Contact />
						</Layout>
					}
				/>
				<Route path="/courses/:id" element={<CourseDetail />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
