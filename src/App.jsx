import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';



const App = () => {

  // Esegui questo codice quando il componente viene montato
React.useEffect(() => {
  const handleResize = () => {
    // Rileva l'altezza della finestra e adatta il layout in base a essa
    document.body.style.height = `${window.innerHeight}px`;
  };

  // Aggiungi l'evento di ridimensionamento
  window.addEventListener('resize', handleResize);

  // Rimuovi l'evento quando il componente viene smontato
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <div className="App">
      <h1>F.E.S.T.O.N.A</h1>
      <p>(Friendly Event Supporter That’s Overly Nerdy And entertaining)</p>  
      <Chatbot /> 
    </div>
  );
};

export default App;
