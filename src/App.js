import React, { useState } from 'react';
import HomePage from './components/HomePage';
import MyCalendar from './components/MyCalendar';
import BookingForm from './components/BookingForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('home');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'home':
        return <HomePage />;
      case 'calendar':
        return <MyCalendar />;
      case 'booking':
        return <BookingForm />;
        case 'guestbook':
        return(
          <div className='column'>

          <p>Kommande </p>
          </div>
          ); 
          
      case 'todo':
        return(
          <>
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
          </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>
          Calle Bach
        </h1>
        <div className="Menu">
      <div className="menu-buttons">
        <button
          className={selectedMenu === 'home' ? 'active' : ''}
          onClick={() => handleMenuClick('home')}
        >
          Home
        </button>
        <button
          className={selectedMenu === 'calendar' ? 'active' : ''}
          onClick={() => handleMenuClick('calendar')}
        >
          Kalender
        </button>
        <button
          className={selectedMenu === 'booking' ? 'active' : ''}
          onClick={() => handleMenuClick('booking')}
        >
          Bokning
        </button>
        <button
          className={selectedMenu === 'guestbook' ? 'active' : ''}
          onClick={() => handleMenuClick('guestbook')}
        >
          Gästbok
        </button>
        <button
          className={selectedMenu === 'todo' ? 'active' : ''}
          onClick={() => handleMenuClick('todo')}
        >
          Att Göra
        </button>
      </div>
      </div>
      </header>
      <div className='App-body'>
      
            {renderContent()}
            </div>
        
            <button onClick={() => setIsAdminMode(!isAdminMode)} className="admin-button">
              {isAdminMode ? "" : ""}
            </button>
          
        </div>
  );
}

export default App;
