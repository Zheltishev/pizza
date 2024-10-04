import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
