
import { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Tag,
  IconButton,
  Flex,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  VStack,
  Select,
  Avatar,
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiUpload, FiEye, FiEdit } from 'react-icons/fi';
import initialUsersData from '../data/users.json';


// Utility to render status tags
const getStatusTag = (status: string) => {
  switch (status) {
    case 'Aktif':
      return <Tag colorScheme="green">Aktif</Tag>;
    case 'Blacklisted':
      return <Tag colorScheme="red">Blacklisted</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const Users = () => {
  const tableBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState(initialUsersData);

  const [newUser, setNewUser] = useState({
    name: '',
    nik: '',
    department: '',
    role: '',
    status: 'Aktif',
    avatarUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const newId = `USR-00${users.length + 1}`; 
    setUsers(prevUsers => [...prevUsers, { id: newId, ...newUser }]);
    onClose(); 
    setNewUser({
        name: '',
        nik: '',
        department: '',
        role: '',
        status: 'Aktif',
        avatarUrl: ''
    });
  };

  return (
    <Box>
      <Heading mb={6}>Manajemen Pengguna</Heading>

      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <InputGroup maxW={{ md: '400px' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari pengguna (nama, NIK, departemen...)" />
        </InputGroup>
        <Spacer />
        <HStack spacing={2} mt={{ base: 4, md: 0 }}>
            <Button leftIcon={<FiUpload />} variant="outline">Import CSV</Button>
            <Button onClick={onOpen} leftIcon={<FiPlus />} colorScheme="cyan">
                Tambah Pengguna Baru
            </Button>
        </HStack>
      </Flex>

      <Box bg={tableBg} borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>NIK / ID</Th>
              <Th>Departemen</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                    <HStack alignItems="center"> {/* This is the corrected line */}
                        <Avatar size="sm" name={user.name} src={user.avatarUrl} />
                        <Box>
                            <Box fontWeight="medium">{user.name}</Box>
                        </Box>
                    </HStack>
                </Td>
                <Td>{user.nik}</Td>
                <Td>{user.department}</Td>
                <Td>{user.role}</Td>
                <Td>{getStatusTag(user.status)}</Td>
                <Td>
                   <HStack spacing={1}>
                    <IconButton aria-label="View details" icon={<FiEye />} variant="ghost" size="sm" />
                    <IconButton aria-label="Edit user" icon={<FiEdit />} variant="ghost" size="sm" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New User Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Pengguna Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input name="name" value={newUser.name} onChange={handleInputChange} placeholder="Contoh: Andi Wijaya" />
              </FormControl>
                <FormControl isRequired>
                  <FormLabel>NIK / NIP / ID Pengguna</FormLabel>
                  <Input name="nik" value={newUser.nik} onChange={handleInputChange} placeholder="Contoh: 123456789" />
                </FormControl>
                 <FormControl isRequired>
                  <FormLabel>Departemen</FormLabel>
                  <Input name="department" value={newUser.department} onChange={handleInputChange} placeholder="Contoh: Teknologi Informasi" />
                </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                   <Select name="role" value={newUser.role} onChange={handleInputChange} placeholder="Pilih role pengguna">
                    <option value="peminjam">Peminjam</option>
                    <option value="staff">Staff Gudang</option>
                    <option value="manajer">Manajer</option>
                    <option value="admin">Admin</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status Awal</FormLabel>
                  <Select name="status" value={newUser.status} onChange={handleInputChange}>
                    <option value="Aktif">Aktif</option>
                    <option value="Blacklisted">Blacklisted</option>
                  </Select>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Kontak (Email / Telepon)</FormLabel>
                <Input placeholder="Opsional" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="cyan" onClick={handleAddUser}>Simpan Pengguna</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Users;
