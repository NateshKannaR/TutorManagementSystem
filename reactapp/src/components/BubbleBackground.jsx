import React, { useState } from 'react';
import './BubbleBackground.css';

function BubbleBackground({ count = 15, color = '#4f46e5' }) {
  const [clickedBubbles, setClickedBubbles] = useState(new Set());

  const handleBubbleClick = (id, e) => {
    e.preventDefault();
    setClickedBubbles(prev => new Set([...prev, id]));
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'bubble-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      document.body.removeChild(ripple);
      setClickedBubbles(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 1000);
  };

  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = 40 + Math.random() * 30;
    return (
      <div
        key={i}
        className={`professional-bubble ${clickedBubbles.has(i) ? 'clicked' : ''}`}
        onClick={(e) => handleBubbleClick(i, e)}
        style={{
          left: `${Math.random() * 90}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${12 + Math.random() * 8}s`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div className="bubble-inner" style={{ background: color }}></div>
        <div className="bubble-highlight"></div>
      </div>
    );
  });

  return <div className="bubble-container">{bubbles}</div>;
}

export default BubbleBackground;