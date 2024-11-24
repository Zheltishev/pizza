import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/components/Profile';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/dashboard/components/Dashboard';

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
            <Dashboard />
          </RequireAuth>
        } />
      </Routes>
    </>
  );
}

export default App;
