import React, { useEffect } from 'react';

const Confetti = () => {
  useEffect(() => {
    const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
    const numConfetti = 100;

    const createConfetti = () => {
      for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background-color: ${color};
          top: -10px;
          left: ${Math.random() * 100}vw;
          opacity: 0;
          transform: translateY(0);
          animation: fall 3s linear forwards;
          z-index: 1000;
        `;

        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }
    };

    // Add the animation to the document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    createConfetti();

    return () => {
      style.remove();
    };
  }, []);

  return null;
};

export default Confetti;