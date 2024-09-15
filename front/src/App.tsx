import './App.css';
import Header from './components/header/Header';
import checkToken from './middleware/checkToken';

function App() {
  checkToken()

  return (
    <Header />
  );
}

export default App;
