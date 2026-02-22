import { createContext, useContext, useMemo } from 'react'

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material'

import { useColorTheme } from '../hooks/useColorTheme.js'

import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

const defaultTheme = createTheme({
  typography: {
    fontFamily: ['Inter', 'serif'].join(','),
  },
})

export const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
  theme: defaultTheme,
})

export const ThemeProvider = ({ children }) => {
  const { mode, toggleColorMode, theme } = useColorTheme()

  const contextValue = useMemo(() => ({
    mode,
    toggleColorMode,
    theme: {
      ...defaultTheme,
      ...theme,
    },
  }), [mode, toggleColorMode, theme])

  return (
      <ThemeContext.Provider value={contextValue}>
        <MUIThemeProvider theme={contextValue.theme}>
          {children}
        </MUIThemeProvider>
      </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
