import { Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
  isSidebarOpen: boolean;
}

const Navbar = ({ isSidebarOpen }: NavbarProps) => {
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
      {!isSidebarOpen ? <Logo /> : <div />}
      <Flex align="center">
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          variant="ghost"
          mr="4"
        />
        <Menu>
          <MenuButton as={Avatar} size="sm" cursor="pointer" />
          <MenuList>
            <Link to="/settings">
              <MenuItem>Setting</MenuItem>
            </Link>
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
