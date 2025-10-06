
import { useState, ElementType } from 'react';
import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { FiMenu, FiHome, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      as="nav"
      w={isOpen ? '250px' : '80px'}
      h="100vh"
      bg="gray.800"
      color="white"
      transition="width 0.3s"
    >
      <Flex h="16" alignItems="center" mx="4" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          {isOpen && 'Admin'}
        </Text>
        <IconButton
          aria-label="Toggle Menu"
          icon={<FiMenu />}
          onClick={handleToggle}
        />
      </Flex>
      <VStack as="nav" spacing={2} align="stretch">
        <NavItem isOpen={isOpen} icon={FiHome} title="Dashboard" />
        <NavItem isOpen={isOpen} icon={FiSettings} title="Settings" />
      </VStack>
    </Box>
  );
};

interface NavItemProps {
    icon: ElementType;
    title: string;
    isOpen: boolean;
}

const NavItem = ({ icon, title, isOpen }: NavItemProps) => {
    const Icon = icon
  return (
    <Flex
      align="center"
      p="3"
      mx="2"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
    >
      {Icon && <Icon size={20} />}
      {isOpen && (
        <Text ml="3" fontSize="sm" transition="opacity 0.3s">
          {title}
        </Text>
      )}
    </Flex>
  );
};

export default Sidebar;
