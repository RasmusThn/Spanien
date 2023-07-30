import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Meny from './Components/Meny.js';
import HomePage from './pages/HomePage';
 import ContactPage from './pages/ContactPage';
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
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Meny /> 
        <Main />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
