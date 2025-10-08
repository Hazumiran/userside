import { type ElementType } from 'react';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { FiMenu, FiHome, FiSettings } from 'react-icons/fi';
import { useColorModeValue } from './ui/color-mode'; // <-- Corrected import path

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="aside"
      w={isOpen ? '200px' : '70px'}
      h="100vh"
      bg={bgColor}
      color="inherit"
      backdropFilter="blur(10px)" // Glassmorphism effect
      transition="width 0.3s"
      position="fixed"
      left="0"
      top="0"
      zIndex={20}
      borderRight="1px"
      borderColor={borderColor}
    >
      <Flex h="16" alignItems="center" mx="4" justifyContent="space-between">
        {isOpen && (
          <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
            Admin
          </Text>
        )}
        <IconButton
          aria-label="Toggle Menu"
          icon={<FiMenu />}
          onClick={onToggle}
          variant="ghost"
        />
      </Flex>
      <nav>
        <VStack gap="2" align="stretch">
          <NavItem isOpen={isOpen} icon={FiHome} title="Dashboard" />
          <NavItem isOpen={isOpen} icon={FiSettings} title="Settings" />
        </VStack>
      </nav>
    </Box>
  );
};

interface NavItemProps {
  icon: ElementType;
  title: string;
  isOpen: boolean;
}

const NavItem = ({ icon, title, isOpen }: NavItemProps) => {
  const Icon = icon;
  const hoverBg = useColorModeValue('cyan.400', 'cyan.600'); // Correctly using the hook

  return (
    <Flex
      align="center"
      p="3"
      mx="2"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      justify={isOpen ? 'flex-start' : 'center'}
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
  );
};

export default Sidebar;
