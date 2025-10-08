import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 1. Add color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false, // We are using next-themes to handle this
};

// 2. extend the theme
const theme = extendTheme({ config });

export default theme;
