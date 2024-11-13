import React, { useEffect, useState } from 'react';
import { getResponse } from '../nlp';
import './Chatbot.css';
import Ai from './Ai';
import { gsap } from 'gsap';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';

      // Imposta lo stato di speaking solo se l'utterance inizia correttamente
      utterance.onstart = () => setIsSpeaking(true);

      utterance.onend = () => {
        console.log("Bot ha terminato di parlare."); // log per il controllo di fine parlato
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis non disponibile.");
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    try {
      const botResponse = await getResponse(input);
      speak(botResponse);
      console.log("Risposta del bot:", botResponse); // logga solo la risposta del bot
      //controllo risposta sensorya. Inserire pop up con posizione google.
      setInput(''); // Resetta l'input dell'utente
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = 'Oops, qualcosa è andato storto!';
      speak(errorMessage);
      console.log("Errore del bot:", errorMessage); // log errore per controllo
    }
  };

  const handleStartChatbot = () => {
    setShowForm(true);
    const welcomeMessage = "Ciao a tutti, io sono FESTONA, il tuo Friendly Event Supporter That's Overly Nerdy And Entertaining! Sì, è un nome lungo, ma non preoccuparti, posso dirti anche solo 'FESTONA'. Sono qui per rispondere a tutte le tue domande sulla festa e per divertirmi con te!";
    speak(welcomeMessage);
  };

  useEffect(() => {
    const animation = gsap.fromTo(
      ".chatbot",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 } // Durata ridotta per maggiore fluidità
    );
  
    // Pulizia dell'animazione in caso di rimozione del componente
    return () => {
      animation.kill();
    };
  }, []);
  

  return (
    <div className="chatbot">

      
<Ai isSpeaking={isSpeaking} />

      
 
      
      {/* <ParticleSphere isSpeaking={isSpeaking} />  */}

      {/* Bottone per avviare il chatbot */}
      {!showForm && (
        <button className='start' onClick={handleStartChatbot}>
          <span>Start</span>
        </button>

      )}

      {/* Form per il messaggio */}
      {showForm && (
        <>
          {isSpeaking}
          <div className="messageBox">
            <input
              id="messageInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chiedi qualcosa sulla festa..."
            />
            <button id="sendButton" onClick={handleSendMessage}>
              <svg viewBox="0 0 664 663" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" fill="none"></path>
                <path d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" stroke="#6c6c6c" strokeWidth="33.67" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
