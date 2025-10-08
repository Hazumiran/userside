
import {
  Box,
  Heading,
  Button,
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
  Input,
  Select,
  Text,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { FiPlus, FiCalendar, FiFilter } from 'react-icons/fi';

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const calendarBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      <Heading mb={6}>Reservasi & Kalender</Heading>

      <Flex mb={6} direction={{ base: 'column', md: 'row' }}>
        <HStack spacing={4}>
            <Button leftIcon={<FiFilter />} variant="outline">Filter Item</Button>
            <Button leftIcon={<FiFilter />} variant="outline">Filter Lokasi</Button>
        </HStack>
        <Spacer />
        <Button onClick={onOpen} leftIcon={<FiPlus />} colorScheme="cyan" mt={{ base: 4, md: 0 }}>
          Buat Reservasi Baru
        </Button>
      </Flex>

      {/* Calendar View Placeholder */}
      <Box bg={calendarBg} borderRadius="lg" p={6} h={{ base: '400px', md: '600px' }}>
        <Flex justifyContent="center" alignItems="center" h="100%" borderWidth="2px" borderStyle="dashed" borderRadius="md">
          <VStack>
             <FiCalendar size="3em" color="gray.400" />
             <Text color="gray.500" fontSize="lg">Tampilan Kalender Reservasi</Text>
             <Text color="gray.400">Integrasikan library kalender seperti FullCalendar atau Big Calendar di sini.</Text>
           </VStack>
        </Flex>
      </Box>

      {/* Add New Booking Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Reservasi Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama Reservasi / Acara</FormLabel>
                <Input placeholder="Contoh: Rapat Tim Marketing" />
              </FormControl>
               <FormControl isRequired>
                <FormLabel>Item yang Dipesan</FormLabel>
                <Select placeholder="Pilih item dari inventaris">
                  <option value="1">Proyektor InFocus A2</option>
                  <option value="2">Kamera DSLR Canon 80D</option>
                  <option value="3">Meja Lipat Portabel</option>
                  <option value="4">Speaker Bluetooth JBL</option>
                </Select>
              </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Mulai Reservasi</FormLabel>
                  <Input type="datetime-local" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Selesai Reservasi</FormLabel>
                  <Input type="datetime-local" />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="cyan">Simpan Reservasi</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Bookings;
