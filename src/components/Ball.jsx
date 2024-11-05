import React, { useEffect, useRef } from "react";
import "./Ball.css"; // Assicurati di avere il tuo CSS

const PulsingBall = () => {
  const ballRef = useRef(null);

  // Funzione per avviare l'animazione quando parli
  const startPulsing = () => {
    const ball = ballRef.current;
    if (ball) {
      ball.classList.add("pulsing");
    }
  };

  const stopPulsing = () => {
    const ball = ballRef.current;
    if (ball) {
      ball.classList.remove("pulsing");
    }
  };

  // Simuliamo il pulsare della palla quando la pagina si carica
  useEffect(() => {
    startPulsing(); // Avvia l'animazione
    const timeout = setTimeout(() => {
      stopPulsing(); // Ferma l'animazione dopo 5 secondi (per esempio)
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container">
      <div className="ball" ref={ballRef}></div>
    </div>
  );
};

export default PulsingBall;
