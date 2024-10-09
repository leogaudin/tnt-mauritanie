import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './theme/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme/index.js'
import './language/'
import { AppProvider } from './context/index.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProvider>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</AppProvider>
	</StrictMode>,
)
