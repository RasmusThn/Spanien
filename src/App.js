import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Meny from './components/Meny';
 import ContactPage from './components/ContactPage';
// import PicturesPage from './pages/PicturesPage';
// import CalenderPage from './pages/CalenderPage';
// import InformationPage from './pages/InformationPage';

function Main(props) {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/calender" element={<CalenderPage />} /> */}
        {/* <Route path="/pictures" element={<PicturesPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/information" element={<InformationPage />} />  */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Meny /> 
        <Main />
        </header>
      </div>
    </Router>
  );
}

export default App;
