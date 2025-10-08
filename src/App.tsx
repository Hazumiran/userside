import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { Provider } from './components/ui/provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  const sidebarWidth = isSidebarOpen && !isMobile ? '200px' : '70px';

  return (
    <Provider>
      <Router>
        <Box>
          <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} isMobile={isMobile} />
          <Box
            as="main"
            position="absolute"
            top="0"
            left={{ base: '0', md: sidebarWidth }}
            width={{ base: '100%', md: `calc(100% - ${sidebarWidth})` }}
            transition="all 0.3s"
            height="100vh"
            display="flex"
            flexDirection="column"
          >
            <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <Box p="4" flex="1" overflowY="auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
