import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Box } from '@chakra-ui/react';
import { Provider } from './components/ui/provider'; // <-- Import the provider

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? '200px' : '70px';

  return (
    // Wrap the entire app in the custom Provider
    <Provider>
      <Box>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <Box
          as="main"
          position="absolute"
          top="0"
          left={sidebarWidth}
          width={`calc(100% - ${sidebarWidth})`}
          transition="all 0.3s"
          height="100vh"
          display="flex"
          flexDirection="column"
        >
          <Navbar />
          <Box p="4" flex="1" overflowY="auto">
            <h1>Welcome to your admin panel</h1>
          </Box>
        </Box>
      </Box>
    </Provider>
  );
}

export default App;
