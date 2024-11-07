import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';



const App = () => {

  // Esegui questo codice quando il componente viene montato
React.useEffect(() => {
     // Funzione per aggiornare l'altezza della pagina quando cambia la dimensione della finestra
     const handleResize = () => {
      document.documentElement.style.setProperty(
        '--keyboard-height',
        `${window.innerHeight}px`
      );
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
