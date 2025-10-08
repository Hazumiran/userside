'use client'

import { useTheme } from "next-themes";

// This is a custom hook that mimics Chakra UI's useColorMode,
// but it's powered by next-themes behind the scenes.
export const useColorMode = () => {
    const { theme, setTheme } = useTheme();

    return {
        colorMode: theme,
        toggleColorMode: () => setTheme(theme === 'light' ? 'dark' : 'light'),
        setColorMode: setTheme,
    }
}

// This function mimics Chakra UI's useColorModeValue.
export const useColorModeValue = (lightValue: any, darkValue: any) => {
    const { theme } = useTheme();
    return theme === 'light' ? lightValue : darkValue;
}
