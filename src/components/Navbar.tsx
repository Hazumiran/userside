
import { Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Avatar, useBreakpointValue } from '@chakra-ui/react';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  details: {
      // a details object
  }
};

const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Flex align="center">
        {isMobile && (
          <IconButton
            aria-label="Toggle Menu"
            icon={<FiMenu />} 
            onClick={onToggleSidebar}
            variant="ghost"
            mr="4"
          />
        )}
        {!isSidebarOpen && <Logo />}
      </Flex>

      <Flex align="center">
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          variant="ghost"
          mr="4"
        />
        <Menu>
          <MenuButton as={Avatar} size="sm" cursor="pointer" name={user.name} />
          <MenuList>
            <Link to="/profile">
                <MenuItem>Profile</MenuItem>
            </Link>
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
