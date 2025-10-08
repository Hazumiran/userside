
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  HStack,
  Button,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBox, FiTrendingUp, FiAlertTriangle, FiDollarSign, FiCalendar, FiPlus, FiSend } from 'react-icons/fi';

const Dashboard = () => {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>

      {/* KPI Summary */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6} mb={8}>
        <Card bg={cardBg} borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <FiBox size="1.2em" />
                <Text ml={2}>Item Tersedia</Text>
              </StatLabel>
              <StatNumber>1,234</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                5.4%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <FiTrendingUp size="1.2em" />
                <Text ml={2}>Sedang Dipinjam</Text>
              </StatLabel>
              <StatNumber>56</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                2.1%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderRadius="lg" borderColor="orange.400" borderWidth={1}>
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center" color="orange.400">
                <FiCalendar size="1.2em" />
                <Text ml={2}>Terlambat</Text>
              </StatLabel>
              <StatNumber>12</StatNumber>
              <StatHelpText>
                Segera ditindaklanjuti
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderRadius="lg" borderColor="red.500" borderWidth={1}>
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center" color="red.500">
                <FiAlertTriangle size="1.2em" />
                <Text ml={2}>Rusak</Text>
              </StatLabel>
              <StatNumber>7</StatNumber>
               <StatHelpText>
                Perlu perbaikan
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg} borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <FiDollarSign size="1.2em" />
                <Text ml={2}>Nilai Inventaris</Text>
              </StatLabel>
              <StatNumber>$1.2M</StatNumber>
              <StatHelpText>
                Per 31 Des 2023
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Quick Actions */}
      <Box mb={8}>
          <Heading size="md" mb={4}>Aksi Cepat</Heading>
          <HStack spacing={4}>
            <Button leftIcon={<FiSend />} colorScheme="cyan" variant="solid">
              Pinjam Cepat
            </Button>
            <Button leftIcon={<FiPlus />} colorScheme="cyan" variant="outline">
              Tambah Item
            </Button>
            <Button leftIcon={<FiCalendar />} colorScheme="cyan" variant="outline">
              Buat Reservasi
            </Button>
          </HStack>
        </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Usage Chart */}
        <Card bg={cardBg} borderRadius="lg">
          <CardHeader>
            <Heading size="md">Grafik Pemakaian (30 Hari)</Heading>
          </CardHeader>
          <CardBody>
            <Box h="200px" bg={useColorModeValue('gray.100', 'gray.600')} borderRadius="md">
              <Flex justifyContent="center" alignItems="center" h="100%">
                  <Text color="gray.400">Placeholder untuk grafik</Text>
              </Flex>
            </Box>
          </CardBody>
        </Card>

        {/* Popular Items */}
        <Card bg={cardBg} borderRadius="lg">
          <CardHeader>
            <Heading size="md">Item Terpopuler</Heading>
          </CardHeader>
          <CardBody>
             <VStack spacing={4} align="stretch">
                <Text>1. Proyektor InFocus</Text>
                <Text>2. Kamera DSLR Canon</Text>
                <Text>3. Speaker Bluetooth JBL</Text>
                <Text>4. Laptop MacBook Pro</Text>
             </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Alerts */}
      <Box>
        <Heading size="md" mb={4}>Peringatan & Notifikasi</Heading>
        <VStack spacing={4} align="stretch">
          <Alert status="warning">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Stok Rendah!</AlertTitle>
              <AlertDescription>
                Stok "Kabel HDMI" hampir habis. Sisa 2 unit.
              </AlertDescription>
            </Box>
          </Alert>
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
                <AlertTitle>Barang Terlambat!</AlertTitle>
                <AlertDescription>
                Peminjaman #INV-123 oleh John Doe telah jatuh tempo kemarin.
                </AlertDescription>
            </Box>
          </Alert>
           <Alert status="info">
            <AlertIcon />
             <Box flex="1">
                <AlertTitle>Maintenance Terjadwal</AlertTitle>
                <AlertDescription>
                Maintenance untuk "Drone DJI Phantom" dijadwalkan besok.
                </AlertDescription>
            </Box>
          </Alert>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
