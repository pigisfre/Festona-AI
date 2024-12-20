import React, { useEffect } from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

const App = () => {
  // Esegui l'animazione con GSAP quando il componente viene montato
  useEffect(() => {


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
      
        <Chatbot /> 
      
    </div>
  );
};

export default App;
