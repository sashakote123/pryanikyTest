import { Container, Box, CssBaseline } from '@mui/material';
import SimpleTable from './components/SimpleTable';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/hoc/RequireAuth'
import LoginPage from './components/LoginPage'
import { useAuth } from './components/hooks/useAuth';
import Header from './components/Header';

function App() {
  const { signOut } = useAuth()
  const handleLogout = () => {
    signOut(() => { })
  }

  return (
    <div className="App">
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
        <CssBaseline />
        <Header handleLogout={handleLogout} />

        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <SimpleTable />
              </RequireAuth>
            } />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </Container>

        <Footer />
      </Box>

    </div>
  );
}

export default App;
