import './App.css';
import React from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
//import Meny from './components/Meny';
//import ContactPage from './components/ContactPage';
import MyCalendar from './components/MyCalendar';
import BookingForm from './components/BookingForm';
// import PicturesPage from './pages/PicturesPage';
// import CalenderPage from './pages/CalenderPage';
// import InformationPage from './pages/InformationPage';

// function Main(props) {
//   return (
//     <div className="container">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/calender" element={<CalenderPage />} /> */}
//         {/* <Route path="/pictures" element={<PicturesPage />} /> */}
//         <Route path="/contact" element={<ContactPage />} />
//         {/* <Route path="/information" element={<InformationPage />} />  */}
//       </Routes>
//     </div>
//   );
// }

function App() {
  return (
    
      <div className="App">
        <header className="App-header">
        <h1>
         <em>
          Välkommen!
          </em>
        </h1>
      
          {/* <Meny /> */}
        </header>
        <div className='App-body'>
          <div className="row">
            <div className="column">
              <HomePage />
            </div>
            <div className="column">
              <h3>Se när det är ledigt!</h3>
              <MyCalendar />
            </div>
            <div className="column">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default App;
