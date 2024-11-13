import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Chatbot from './components/Chatbot';
import './App.css';

const App = () => {
  // Esegui l'animazione con GSAP quando il componente viene montato
  useEffect(() => {
    // Testo "scramble" per il titolo
    gsap.fromTo(
      ".title",
      { opacity: 0, y: -50 }, // Posizione iniziale delle lettere
      {
        opacity: 1,
        y: 0, // Posizione finale delle lettere
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.05, // Ritardo tra le lettere
        onStart: () => {
          // Anima lettere singole
          const titleText = document.querySelector('.title');
          scrambleText(titleText);
        },
      }
    );

    // Testo "scramble" per la descrizione
    gsap.fromTo(
      ".description",
      { opacity: 0, y: -30 }, // Posizione iniziale delle lettere
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.03,
        onStart: () => {
          const descText = document.querySelector('.description');
          scrambleText(descText);
        },
      }
    );
   

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

    // Funzione di scramble per ogni lettera singola
    const scrambleText = (element) => {
      const originalText = element.innerText;
      const scrambledText = originalText.split("").map((char) => {
        return `<span class="scramble-letter">${char}</span>`;
      }).join("");
      element.innerHTML = scrambledText;
  
      gsap.to(".scramble-letter", {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

  return (
    <div className="App">
      <h1 className="title">F.E.S.T.O.N.A</h1>
      <p className="description">(Friendly Event Supporter That’s Overly Nerdy And Entertaining)</p>
      
        <Chatbot /> 
      
    </div>
  );
};

export default App;
