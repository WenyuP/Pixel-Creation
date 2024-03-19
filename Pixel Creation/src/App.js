import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import Navbar from './components/navbar';
import Aboutus from './components/aboutus'


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus />} /> {/* Define a unique path for the About Us page */}
      </Routes>
    </Router>
  );
}

export default App;
