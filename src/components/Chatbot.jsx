import React, { useEffect, useState } from 'react';
import { getResponse } from '../nlp';
import './Chatbot.css';
import Ai from './Ai';
import { gsap } from 'gsap';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false); // Stato per il modale

  // Aggiungi una lista di domande di suggerimento
  const suggestions = [
    'Quando è la festa?',
    'Dove si terrà la festa?',
    'Qual è il tema della festa?',
    'Ci si deve vestire a tema?',
    'Posso vestirmi da Joker?',
    'Quante disoneste ci sono?',
    'Chi è la più disonesta?'
  ];

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';

      utterance.onstart = () => setIsSpeaking(true);

      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis non disponibile.");
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    try {
      const botResponse = await getResponse(input);

      if (input.toLowerCase() === 'dove si terrà la festa?') {
        // Mostra il modale se la domanda è specifica
        setShowModal(true);
      }

      speak(botResponse);
      setInput(''); // Resetta l'input dell'utente
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = 'Oops, qualcosa è andato storto!';
      speak(errorMessage);
    }
  };

  const handleStartChatbot = () => {
    setShowForm(true);
    const welcomeMessage = "Ciao a tutti, io sono FESTONA, il tuo Friendly Event Supporter That's Overly Nerdy And Entertaining! Sì, è un nome lungo, ma non preoccuparti, puoi chiamarmi FESTONA. Sono qui per rispondere a tutte le tue domande sulla festa e per divertirci insieme!";
    speak(welcomeMessage);
  };

  useEffect(() => {
    const animation = gsap.fromTo(
      ".chatbot",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    return () => animation.kill();
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="chatbot">
      <Ai isSpeaking={isSpeaking} />

      {!showForm && (
        <button className="start" onClick={handleStartChatbot}>
          Start
        </button>
      )}

      {showForm && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="chip"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <>
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

      {/* Modale per la posizione della festa */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>La festa si terrà presso Sensorya, SS96, km.114+300, Modugno, Palo del Colle BA.</p>
            <a
              href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x1347ed5699244557:0x834bf732ae6c1588?sa=X&ved=1t:8290&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-button"
            >
              Apri in Maps
            </a>
            <span onClick={closeModal} className="close-modal">&times;</span>

          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
