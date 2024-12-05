import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/components/Profile';
import RequireAuth from './components/RequireAuth';
import { lazy, Suspense } from 'react';
import { CircularProgress, Dialog } from '@mui/material';

const Dashboard = lazy(() => import ('./pages/dashboard/components/Dashboard'))

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/profile' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path='/dashboard' element={
          <RequireAuth>
            <Suspense fallback={
              <Dialog open>
                <CircularProgress color="primary" />
              </Dialog>
            }>
              <Dashboard />
            </Suspense>
          </RequireAuth>
        } />
      </Routes>
    </>
  );
}

export default App;
