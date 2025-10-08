
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
  Textarea,
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import suppliersData from '../data/suppliers.json';


const Suppliers = () => {
  const tableBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Heading mb={6}>Manajemen Supplier & Purchase</Heading>

      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <InputGroup maxW={{ md: '400px' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari supplier (nama, kontak...)" />
        </InputGroup>
        <Spacer />
        <Button onClick={onOpen} leftIcon={<FiPlus />} colorScheme="cyan" mt={{ base: 4, md: 0 }}>
          Tambah Supplier Baru
        </Button>
      </Flex>

      <Box bg={tableBg} borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID Supplier</Th>
              <Th>Nama Supplier</Th>
              <Th>Kontak Person</Th>
              <Th>Email</Th>
              <Th>Telepon</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {suppliersData.map((supplier) => (
              <Tr key={supplier.id}>
                <Td>{supplier.id}</Td>
                <Td fontWeight="medium">{supplier.name}</Td>
                <Td>{supplier.contactPerson}</Td>
                <Td>{supplier.email}</Td>
                <Td>{supplier.phone}</Td>
                <Td>
                   <HStack spacing={1}>
                    <IconButton aria-label="Edit supplier" icon={<FiEdit />} variant="ghost" size="sm" />
                    <IconButton aria-label="Delete supplier" icon={<FiTrash2 />} variant="ghost" size="sm" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New Supplier Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Supplier Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama Supplier</FormLabel>
                <Input placeholder="Contoh: PT Elektronik Jaya" />
              </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Kontak Person</FormLabel>
                  <Input placeholder="Contoh: Rina Hartono" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Contoh: info@supplier.com" />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Telepon</FormLabel>
                <Input placeholder="Contoh: 021-555-1234" />
              </FormControl>
              <FormControl>
                <FormLabel>Alamat</FormLabel>
                <Textarea placeholder="Alamat lengkap supplier" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="cyan">Simpan Supplier</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Suppliers;
