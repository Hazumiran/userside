
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
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiEye } from 'react-icons/fi';
import initialRentalsData from '../data/rentals.json';


// Utility to render status tags
const getStatusTag = (status: string) => {
  switch (status) {
    case 'Dikembalikan':
      return <Tag colorScheme="gray">Dikembalikan</Tag>;
    case 'Dipinjam':
      return <Tag colorScheme="blue">Dipinjam</Tag>;
    case 'Terlambat':
      return <Tag colorScheme="red">Terlambat</Tag>;
    case 'Disetujui':
        return <Tag colorScheme="green">Disetujui</Tag>;
    case 'Pending':
        return <Tag colorScheme="yellow">Pending</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const Rentals = () => {
  const tableBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rentals, setRentals] = useState(initialRentalsData);
  const [newRental, setNewRental] = useState({
      peminjam: '',
      item: '',
      tglPinjam: '',
      tglKembali: '',
      status: 'Pending',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRental(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRental = () => {
    const newId = `RNT-00${rentals.length + 1}`;
    setRentals(prev => [...prev, { id: newId, ...newRental }]);
    onClose();
    setNewRental({ // Reset form
      peminjam: '',
      item: '',
      tglPinjam: '',
      tglKembali: '',
      status: 'Pending',
    });
  };

  return (
    <Box>
      <Heading mb={6}>Manajemen Peminjaman</Heading>

      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <InputGroup maxW={{ md: '400px' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari peminjaman (ID, peminjam, item...)" />
        </InputGroup>
        <Spacer />
        <Button onClick={onOpen} leftIcon={<FiPlus />} colorScheme="cyan" mt={{ base: 4, md: 0 }}>
          Buat Peminjaman Baru
        </Button>
      </Flex>

      <Box bg={tableBg} borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Peminjam</Th>
              <Th>Item</Th>
              <Th>Tgl Pinjam</Th>
              <Th>Tgl Kembali</Th>
              <Th>Status</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rentals.map((rental) => (
              <Tr key={rental.id}>
                <Td>{rental.id}</Td>
                <Td fontWeight="medium">{rental.peminjam}</Td>
                <Td>{rental.item}</Td>
                <Td>{rental.tglPinjam}</Td>
                <Td>{rental.tglKembali}</Td>
                <Td>{getStatusTag(rental.status)}</Td>
                <Td>
                  <HStack spacing={1}>
                    <IconButton aria-label="View details" icon={<FiEye />} variant="ghost" size="sm" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New Rental Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Peminjaman Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Peminjam</FormLabel>
                <Input name="peminjam" value={newRental.peminjam} onChange={handleInputChange} placeholder="Nama peminjam atau departemen" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Item yang Dipinjam</FormLabel>
                <Select name="item" value={newRental.item} onChange={handleInputChange} placeholder="Pilih item dari inventaris">
                  <option value="Proyektor InFocus A2">Proyektor InFocus A2</option>
                  <option value="Kamera DSLR Canon 80D">Kamera DSLR Canon 80D</option>
                  <option value="Meja Lipat Portabel">Meja Lipat Portabel</option>
                  <option value="Speaker Bluetooth JBL">Speaker Bluetooth JBL</option>
                </Select>
              </FormControl>
               <FormControl>
                  <FormLabel>Jumlah</FormLabel>
                  <Input type="number" placeholder="1" />
                </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Tanggal Mulai Pinjam</FormLabel>
                  <Input name="tglPinjam" value={newRental.tglPinjam} onChange={handleInputChange} type="date" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tanggal Harus Kembali</FormLabel>
                  <Input name="tglKembali" value={newRental.tglKembali} onChange={handleInputChange} type="date" />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="cyan" onClick={handleAddRental}>Buat Peminjaman</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Rentals;
