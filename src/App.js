import logo from './logo.svg';
import frontImage from './images/front.jpg'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={frontImage} className="front-image" />
        <p>
         Välkommen!
        </p>
       
      </header>
    </div>
  );
}

export default App;
