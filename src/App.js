import './App.css';
import React, { useState } from 'react';
//import { firestore } from './components/firebase';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
//import Meny from './components/Meny';
//import ContactPage from './components/ContactPage';
import MyCalendar from './components/MyCalendar';
import BookingForm from './components/BookingForm';
import TodoList from './components/TodoList';
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

  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>
          Välkommen
        </h1>
      </header>
      <div className='App-body'>
        <div>
          <div className="column">
            <HomePage />
            
          </div>
          <div className="column">
            <h2>Se när det är ledigt nedan!</h2>
            <MyCalendar />
          </div>
          <div className="column">
            <BookingForm />
          </div>
        
        <div className="row"> 
          <div className='column'> 
          <div className="todo-list-container">
            <TodoList collectionName="Inköp" isAdminMode={isAdminMode}/>
          </div>
          </div>
          <div className='column'> 
          <div className="todo-list-container">
            <TodoList collectionName="Att Göra" isAdminMode={isAdminMode}/>
          </div>
          </div>
          <button onClick={() => setIsAdminMode(!isAdminMode)} className="admin-button">
          {isAdminMode ? "" : ""}
        </button>
        </div>
        <div>
  <h1>Länkar</h1>
  <h3>Hitta på</h3>
  <h4><a href='https://www.spain.info/en/destination/alicante-alacant/' target="_blank" rel="noreferrer">Visit Alicante</a></h4>
  <h3>Mat</h3>
  <h4><a href='https://en.patagoniagranalacant.com/' target="_blank" rel="noreferrer">Patagonia Steak House</a></h4>
  <h3>Shopping</h3>
  <h4><a href='http://ccgranalacant.com/' target="_blank" rel="noreferrer">Gran Alacant Shopping Mall</a></h4>
</div>
        </div>
      </div>
    </div>
  );
}

export default App;
