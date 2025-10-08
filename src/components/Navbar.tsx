import { Flex, IconButton } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useColorMode, useColorModeValue } from './ui/color-mode'; // <-- Corrected import path

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="100%"
      p="4"
      bg={bgColor}
      color="inherit"
      backdropFilter="blur(10px)" // Glassmorphism effect
      zIndex={10}
    >
      <div>Logo</div>
      <Flex align="center">
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          variant="ghost"
        />
        <span style={{ marginLeft: '1rem' }}>User Menu</span>
      </Flex>
    </Flex>
  );
};

export default Navbar;
