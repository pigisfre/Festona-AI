import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';



const App = () => {
  return (
    <div className="App">
      <img src="src/assets/logo.png" alt="Descrizione dell'immagine" width="150" height="100"/>
      <h1>F.E.S.T.O.N.A</h1>
      <p>(Friendly Event Supporter That’s Overly Nerdy And entertaining)</p>  
      <Chatbot /> 
    </div>
  );
};

export default App;
