import { useMemo, useState } from 'react'

import { createTheme } from '@mui/material'
import { grey, indigo } from '@mui/material/colors'

export const useColorTheme = () => {
  const [mode, setMode] = useState('light')
  const [fontSize, setFontSize] = useState(16)

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  const changeFontSize = (size) => setFontSize(+size)

  const modifiedTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            ...indigo,
            main: indigo['A200'],
            dark: indigo['A100'],
          },
          custom: {
            ...grey,
            main: grey[200],
            dark: grey[100],
            contrastText: indigo['A200'],
          },
          action: {
            disabledBackground: indigo[100],
          },
        },
        typography: {
          fontSize: +fontSize,
        },
      }),
    [mode, fontSize],
  )

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
    fontSize,
    changeFontSize,
  }
}
