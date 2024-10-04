import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Explain from './explainaiton';

function App() {
  return (
    <Router>
<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/explain" element={<Explain />} />
  </Routes>
    </Router>
    
  );
}

export default App;
