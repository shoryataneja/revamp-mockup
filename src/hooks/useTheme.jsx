import { createContext, useContext, useEffect, useState } from 'react'

/* eslint-disable react-refresh/only-export-components */
const ThemeContext = createContext('dark')

const DEFAULT_THEME = 'dark'

function readStoredTheme() {
  try {
    const stored = window.localStorage?.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function persistTheme(theme) {
  try {
    window.localStorage?.setItem('theme', theme)
  } catch {
    /* storage blocked or unavailable — theme still works for this session */
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    persistTheme(theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
