import React, { useEffect } from "react";

const Confetti = () => {
  useEffect(() => {
    const colors = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

    const numConfetti = 100;

    // Function to create confetti elements and animate them
    const createConfetti = () => {
      // Loop to create a set number of confetti pieces
      for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Style the confetti element using inline CSS
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background-color: ${color};
          top: -10px;
          left: ${Math.random() * 100}vw; /* Random horizontal position */
          opacity: 0;
          transform: translateY(0); /* Start position */
          animation: fall 3s linear forwards; /* Apply falling animation */
          z-index: 1000; /* Ensure it's on top */
        `;

        document.body.appendChild(confetti);

        // Remove the confetti element after 3 seconds (animation duration)
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }
    };

    // Create and append CSS for the confetti fall animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fall {
        0% {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translateY(100vh) rotate(360deg); /* Move confetti down and rotate */
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
