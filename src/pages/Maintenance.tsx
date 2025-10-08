
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
  Textarea,
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiEye } from 'react-icons/fi';
import maintenanceData from '../data/maintenance.json';


// Utility to render status tags
const getStatusTag = (status: string) => {
  switch (status) {
    case 'Selesai':
      return <Tag colorScheme="green">Selesai</Tag>;
    case 'Dalam Pengerjaan':
      return <Tag colorScheme="blue">Dalam Pengerjaan</Tag>;
    case 'Terbuka':
      return <Tag colorScheme="yellow">Terbuka</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const Maintenance = () => {
  const tableBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Heading mb={6}>Maintenance & Service</Heading>

      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <InputGroup maxW={{ md: '400px' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari work order (ID, item...)" />
        </InputGroup>
        <Spacer />
        <Button onClick={onOpen} leftIcon={<FiPlus />} colorScheme="cyan" mt={{ base: 4, md: 0 }}>
          Buat Work Order Baru
        </Button>
      </Flex>

      <Box bg={tableBg} borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Item</Th>
              <Th>Masalah Dilaporkan</Th>
              <Th>Tanggal Laporan</Th>
              <Th>Ditugaskan Ke</Th>
              <Th>Status</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {maintenanceData.map((wo) => (
              <Tr key={wo.id}>
                <Td>{wo.id}</Td>
                <Td fontWeight="medium">{wo.item}</Td>
                <Td maxW="300px" whiteSpace="normal">{wo.problem}</Td>
                <Td>{wo.reportedDate}</Td>
                <Td>{wo.assignedTo}</Td>
                <Td>{getStatusTag(wo.status)}</Td>
                <Td>
                  <IconButton aria-label="View details" icon={<FiEye />} variant="ghost" size="sm" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New Work Order Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Work Order Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Item yang Bermasalah</FormLabel>
                <Select placeholder="Pilih item dari inventaris">
                   <option value="1">Proyektor InFocus A2</option>
                  <option value="2">Kamera DSLR Canon 80D</option>
                  <option value="3">Meja Lipat Portabel</option>
                  <option value="4">Speaker Bluetooth JBL</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Deskripsi Masalah</FormLabel>
                <Textarea placeholder="Jelaskan masalah atau kerusakan secara detail..." />
              </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl>
                  <FormLabel>Ditugaskan Ke</FormLabel>
                  <Input placeholder="Nama teknisi atau tim" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Prioritas</FormLabel>
                  <Select defaultValue="sedang">
                    <option value="tinggi">Tinggi</option>
                    <option value="sedang">Sedang</option>
                    <option value="rendah">Rendah</option>
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="cyan">Buat Work Order</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Maintenance;
