'use client'

import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from 'next-themes'
import React from "react"
import theme from "../../theme"; // <-- Import the theme

// This component now correctly wraps the app in both providers.
// ThemeProvider from next-themes manages the state (light/dark).
// ChakraProvider provides the UI components, now with an explicit theme.
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ChakraProvider theme={theme}> {/* <-- Pass the theme to the provider */}
            {children}
        </ChakraProvider>
    </ThemeProvider>
  )
}
