'use client'

import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import theme from "../../theme"; // <-- Import the theme

// This component now correctly wraps the app in ChakraProvider.
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}> {/* <-- Pass the theme to the provider */}
        {children}
    </ChakraProvider>
  )
}
