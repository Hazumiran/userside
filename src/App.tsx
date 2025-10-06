import Sidebar from './components/Sidebar';
import { Box, Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex>
      <Sidebar />
      <Box p="4">
        <h1>Welcome to your admin panel</h1>
      </Box>
    </Flex>
  );
}

export default App;