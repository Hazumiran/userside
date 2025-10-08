
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
import { FiPlus, FiSearch, FiMapPin, FiChevronsRight } from 'react-icons/fi';
import locationsData from '../data/locations.json';


const Locations = () => {
  const tableBg = useColorModeValue('white', 'gray.700');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isTransferOpen, onOpen: onTransferOpen, onClose: onTransferClose } = useDisclosure();

  return (
    <Box>
      <Heading mb={6}>Manajemen Lokasi & Cabang</Heading>

      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <InputGroup maxW={{ md: '400px' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari lokasi (nama, tipe...)" />
        </InputGroup>
        <Spacer />
        <HStack spacing={2} mt={{ base: 4, md: 0 }}>
            <Button onClick={onTransferOpen} leftIcon={<FiChevronsRight />} variant="outline">Request Transfer</Button>
            <Button onClick={onAddOpen} leftIcon={<FiPlus />} colorScheme="cyan">
                Tambah Lokasi Baru
            </Button>
        </HStack>
      </Flex>

      <Box bg={tableBg} borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nama Lokasi</Th>
              <Th>Tipe</Th>
              <Th>Lokasi Induk</Th>
              <Th>Jumlah Item</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {locationsData.map((loc) => (
              <Tr key={loc.id}>
                <Td>{loc.id}</Td>
                <Td fontWeight="medium">{loc.name}</Td>
                <Td><Tag>{loc.type}</Tag></Td>
                <Td>{loc.parent}</Td>
                <Td>{loc.itemCount}</Td>
                <Td>
                   <IconButton aria-label="Details" icon={<FiMapPin />} variant="ghost" size="sm" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New Location Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Lokasi Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama Lokasi</FormLabel>
                <Input placeholder="Contoh: Lantai 3, Gudang Belakang" />
              </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Tipe Lokasi</FormLabel>
                   <Select placeholder="Pilih tipe">
                    <option value="gedung">Gedung</option>
                    <option value="lantai">Lantai</option>
                    <option value="ruangan">Ruangan</option>
                    <option value="gudang">Gudang</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Lokasi Induk</FormLabel>
                   <Select placeholder="Pilih lokasi induk (opsional)">
                    <option value="1">Gedung Utama</option>
                    <option value="2">Lantai 2</option>
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Batal
            </Button>
            <Button colorScheme="cyan">Simpan Lokasi</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Request Transfer Modal */}
      <Modal isOpen={isTransferOpen} onClose={onTransferClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Transfer Antar-Lokasi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Item yang Akan Ditransfer</FormLabel>
                    <Select placeholder="Pilih item dari inventaris">
                        <option>Proyektor InFocus A2 (Gudang)</option>
                        <option>Kamera DSLR Canon 80D (Lantai 2)</option>
                    </Select>
                </FormControl>
              <HStack w="100%" spacing={4} align="flex-end">
                <FormControl isRequired>
                  <FormLabel>Dari Lokasi</FormLabel>
                   <Select placeholder="Pilih lokasi asal">
                    <option>Gudang Logistik</option>
                    <option>Lantai 2</option>
                  </Select>
                </FormControl>
                <FiChevronsRight size="2em" color="gray.400"/>
                <FormControl isRequired>
                  <FormLabel>Ke Lokasi</FormLabel>
                   <Select placeholder="Pilih lokasi tujuan">
                    <option>Gedung Utama</option>
                    <option>Ruang Rapat A</option>
                  </Select>
                </FormControl>
              </HStack>
                 <FormControl isRequired>
                    <FormLabel>Alur Persetujuan</FormLabel>
                    <Select>
                        <option>Otomatis Disetujui</option>
                        <option>Memerlukan Persetujuan Manajer Logistik</option>
                    </Select>
                </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onTransferClose}>
              Batal
            </Button>
            <Button colorScheme="cyan">Buat Request</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Locations;
