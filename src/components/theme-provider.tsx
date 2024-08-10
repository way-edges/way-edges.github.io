'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Button } from './ui/button'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useToggleTheme() {
  const { setTheme, theme } = useTheme()

  return () => {
    console.log('toggle')
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
}

export const ModeToggle = React.memo(() => {
  const toggleTheme = useToggleTheme()
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <label className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">🌅</label>
      <label className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
        🌑
      </label>
    </Button>
  )
})
ModeToggle.displayName = 'ModeToggle'

// import { createContext, useContext, useEffect, useState } from "react";
//
// type Theme = "dark" | "light" | "system";
//
// type ThemeProviderProps = {
//   children: React.ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// };
//
// type ThemeProviderState = {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
// };
//
// const initialState: ThemeProviderState = {
//   theme: "system",
//   setTheme: () => null,
// };
//
// const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
//
// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "vite-ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<Theme>(
//     () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
//   );
//
//   useEffect(() => {
//     const root = window.document.documentElement;
//
//     root.classList.remove("light", "dark");
//
//     if (theme === "system") {
//       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//         .matches
//         ? "dark"
//         : "light";
//
//       root.classList.add(systemTheme);
//       return;
//     }
//
//     root.classList.add(theme);
//   }, [theme]);
//
//   const value = {
//     theme,
//     setTheme: (theme: Theme) => {
//       localStorage.setItem(storageKey, theme);
//       setTheme(theme);
//     },
//   };
//
//   return (
//     <ThemeProviderContext.Provider {...props} value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   );
// }
//
// export const useTheme = () => {
//   const context = useContext(ThemeProviderContext);
//
//   if (context === undefined)
//     throw new Error("useTheme must be used within a ThemeProvider");
//
//   return context;
// };
