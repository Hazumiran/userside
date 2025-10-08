
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
  Select
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiDownload, FiUpload } from 'react-icons/fi';
import initialInventoryData from '../data/inventory.json';


// A simple utility to render condition tags
const getConditionTag = (condition: string) => {
  switch (condition) {
    case 'Baik':
      return <Tag colorScheme="green">Baik</Tag>;
    case 'Perbaikan':
      return <Tag colorScheme="yellow">Perbaikan</Tag>;
    case 'Rusak':
      return <Tag colorScheme="red">Rusak</Tag>;
    default:
      return <Tag>{condition}</Tag>;
  }
};

// The main component for the Inventory page
const Inventory = () => {
  const tableBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for the modal
  const [inventory, setInventory] = useState(initialInventoryData);
  const [newItem, setNewItem] = useState({
      name: '',
      sku: '',
      category: '',
      location: '',
      condition: 'Baik',
      stock: { total: 0, available: 0 }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'totalStock') {
        const total = parseInt(value, 10) || 0;
        setNewItem(prev => ({ 
            ...prev, 
            stock: { total: total, available: total } // Assuming all new stock is available
        }));
    } else {
        setNewItem(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItem = () => {
    const newId = `ITM-00${inventory.length + 1}`; // Simple ID generation
    setInventory(prev => [...prev, { id: newId, ...newItem }]);
    onClose();
    // Reset form
    setNewItem({
        name: '',
        sku: '',
        category: '',
        location: '',
        condition: 'Baik',
        stock: { total: 0, available: 0 }
    });
  };


  return (
    <Box>
      <Heading mb={6}>Inventaris Barang</Heading>

      {/* Action Bar */}
      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <InputGroup maxW={{ md: '400px' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari barang (nama, SKU, lokasi...)" />
        </InputGroup>
        <Spacer />
        <HStack spacing={2} mt={{ base: 4, md: 0 }}>
          <Button leftIcon={<FiUpload />} variant="outline">Import</Button>
          <Button leftIcon={<FiDownload />} variant="outline">Export</Button>
          <Button onClick={onOpen} leftIcon={<FiPlus />} colorScheme="cyan">
            Tambah Item Baru
          </Button>
        </HStack>
      </Flex>

      {/* Inventory Table */}
      <Box bg={tableBg} borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama Item</Th>
              <Th>SKU</Th>
              <Th>Kategori</Th>
              <Th>Lokasi</Th>
              <Th>Kondisi</Th>
              <Th>Stok (Tersedia/Total)</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventory.map((item) => (
              <Tr key={item.id}>
                <Td fontWeight="medium">{item.name}</Td>
                <Td>{item.sku}</Td>
                <Td>{item.category}</Td>
                <Td>{item.location}</Td>
                <Td>{getConditionTag(item.condition)}</Td>
                <Td>{`${item.stock.available} / ${item.stock.total}`}</Td>
                <Td>
                  <HStack spacing={1}>
                    <IconButton aria-label="Edit item" icon={<FiEdit />} variant="ghost" size="sm" />
                    <IconButton aria-label="Delete item" icon={<FiTrash2 />} variant="ghost" size="sm" colorScheme="red" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New Item Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Item Inventaris Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama Item</FormLabel>
                <Input name="name" value={newItem.name} onChange={handleInputChange} placeholder="Contoh: Proyektor InFocus A2" />
              </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>SKU</FormLabel>
                  <Input name="sku" value={newItem.sku} onChange={handleInputChange} placeholder="Contoh: PROJ-INF-A2-001" />
                </FormControl>
                <FormControl>
                  <FormLabel>Serial Number</FormLabel>
                  <Input placeholder="Opsional" />
                </FormControl>
              </HStack>
               <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Kategori</FormLabel>
                   <Select name="category" value={newItem.category} onChange={handleInputChange} placeholder="Pilih kategori">
                    <option value="Elektronik">Elektronik</option>
                    <option value="Fotografi">Fotografi</option>
                    <option value="Furnitur">Furnitur</option>
                    <option value="Audio">Audio</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Lokasi</FormLabel>
                  <Input name="location" value={newItem.location} onChange={handleInputChange} placeholder="Contoh: Gudang A, Rak 3" />
                </FormControl>
              </HStack>
               <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Jumlah Total</FormLabel>
                  <Input name="totalStock" value={newItem.stock.total} onChange={handleInputChange} type="number" placeholder="5" />
                </FormControl>
                 <FormControl isRequired>
                  <FormLabel>Kondisi Awal</FormLabel>
                  <Select name="condition" value={newItem.condition} onChange={handleInputChange}>
                    <option value="Baik">Baik</option>
                    <option value="Perbaikan">Butuh Perbaikan</option>
                    <option value="Rusak">Rusak</option>
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="cyan" onClick={handleAddItem}>Simpan Item</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Inventory;
