import React, { useEffect, useState } from 'react';
import './ParticleBackground.css';

function StarField() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starArray = [];
    for (let i = 0; i < 150; i++) {
      starArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        animationDelay: Math.random() * 2
      });
    }
    setStars(starArray);
  }, []);

  return (
    <div className="stars-container">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}
    </div>
  );
}

export default StarField;