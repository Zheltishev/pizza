import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/components/Profile';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
