import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import { useThemeContext } from './hoc/ThemeProvider.jsx'
import HomePage from './pages/HomePage'

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
            <Route index element={<HomePage />} />
        </Routes>
      <Toaster position="top-right" reverseOrder />
    </ThemeProvider>
  )
}

export default App
