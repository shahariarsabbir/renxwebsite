import { StrictMode } from 'react'
import { Provider } from './components/ui/Provider'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider>
			<App />
		</Provider>
	</StrictMode>,
)
