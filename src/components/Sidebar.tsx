import type { ElementType } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FiMenu, FiHome, FiSettings, FiUser } from 'react-icons/fi';
import { useColorModeValue } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const Sidebar = ({ isOpen, onToggle, isMobile }: SidebarProps) => {
  const { isOpen: isDrawerOpen, onOpen, onClose } = useDisclosure();

  const sidebarContent = (
    <Box
      as="aside"
      w={isOpen ? '200px' : '70px'}
      h="100vh"
      bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
      color="inherit"
      backdropFilter="blur(10px)"
      transition="width 0.3s"
      borderRight="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex h="16" alignItems="center" mx="4" justifyContent="space-between">
        {isOpen && <Logo />}
        <IconButton aria-label="Toggle Menu" icon={<FiMenu />} onClick={onToggle} variant="ghost" />
      </Flex>
      <nav>
        <VStack gap="2" align="stretch">
          <NavItem isOpen={isOpen} icon={FiHome} title="Dashboard" to="/" />
          <NavItem isOpen={isOpen} icon={FiSettings} title="Settings" to="/settings" />
          <NavItem isOpen={isOpen} icon={FiUser} title="Profile" to="/profile" />
        </VStack>
      </nav>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Open Menu"
          icon={<FiMenu />}
          onClick={onOpen}
          variant="ghost"
          position="fixed"
          top="4"
          left="4"
          zIndex="20"
        />
        <Drawer isOpen={isDrawerOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>{sidebarContent}</DrawerContent>
        </Drawer>
      </>
    );
  }

  return sidebarContent;
};

interface NavItemProps {
  icon: ElementType;
  title: string;
  isOpen: boolean;
  to: string;
}

const NavItem = ({ icon, title, isOpen, to }: NavItemProps) => {
  const Icon = icon;
  const location = useLocation();
  const isActive = location.pathname === to;
  const hoverBg = useColorModeValue('cyan.400', 'cyan.600');
  const activeBg = useColorModeValue('cyan.500', 'cyan.700');

  return (
    <Link to={to}>
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        justify={isOpen ? 'flex-start' : 'center'}
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? 'white' : 'inherit'}
        _hover={{
          bg: hoverBg,
          color: 'white',
        }}
      >
        {Icon && <Icon size={20} />}
        {isOpen && (
          <Text ml="3" fontSize="sm">
            {title}
          </Text>
        )}
      </Flex>
    </Link>
  );
};

export default Sidebar;
