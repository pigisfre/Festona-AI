import React, { useState } from 'react';
import { getResponse } from '../nlp';
import './Chatbot.css';
import Ai from './Ai';

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

  return (
    <div className="chatbot">

      
<Ai isSpeaking={isSpeaking} />

      
 
      
      {/* <ParticleSphere isSpeaking={isSpeaking} />  */}

      {/* Bottone per avviare il chatbot */}
      {!showForm && (
        <button className='start' onClick={handleStartChatbot}>
          <svg className='startSvg'
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Inizia</span>
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
