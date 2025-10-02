// Dynamic import for anime.js to avoid SSR issues
let anime;
if (typeof window !== 'undefined') {
  try {
    anime = require('animejs').default || require('animejs');
  } catch (error) {
    console.warn('Anime.js failed to load:', error);
    anime = null;
  }
}

// Fallback function for when anime is not available
const safeAnime = (config) => {
  if (anime && typeof anime === 'function') {
    return anime(config);
  }
  return { finished: Promise.resolve() };
};

// Navigation Hover Animations
export const animateNavHover = (element) => {
  if (!element) return;
  safeAnime({
    targets: element,
    scale: [1, 1.1],
    rotate: '1turn',
    duration: 300,
    easing: 'easeOutElastic(1, .8)',
    complete: () => {
      safeAnime({
        targets: element,
        scale: [1.1, 1],
        rotate: '0turn',
        duration: 200,
        easing: 'easeOutQuad'
      });
    }
  });
};

export const animateNavLeave = (element) => {
  if (!element) return;
  safeAnime({
    targets: element,
    scale: 1,
    rotate: 0,
    duration: 150,
    easing: 'easeOutQuad'
  });
};

// Button Hover Animations
export const animateButtonHover = (element) => {
  if (!element) return;
  safeAnime({
    targets: element,
    scale: [1, 1.05],
    boxShadow: [
      {value: '0 0 20px rgba(0, 255, 255, 0.3)'},
      {value: '0 0 40px rgba(0, 255, 255, 0.8)'}
    ],
    duration: 200,
    easing: 'easeOutQuad'
  });
};

export const animateButtonLeave = (element) => {
  if (!element) return;
  safeAnime({
    targets: element,
    scale: 1,
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    duration: 150,
    easing: 'easeOutQuad'
  });
};

// Card Hover Animations
export const animateCardHover = (element) => {
  if (!element) return;
  safeAnime({
    targets: element,
    translateY: [0, -10],
    scale: [1, 1.02],
    boxShadow: [
      {value: '0 5px 25px rgba(0, 255, 255, 0.2)'},
      {value: '0 15px 45px rgba(0, 255, 255, 0.4)'}
    ],
    duration: 300,
    easing: 'easeOutCubic'
  });

  // Animate card content
  const cardContent = element.querySelectorAll('.card-content > *');
  if (cardContent.length > 0 && anime) {
    safeAnime({
      targets: cardContent,
      translateX: [0, 10],
      opacity: [1, 0.9, 1],
      duration: 300,
      delay: anime.stagger ? anime.stagger(50) : 0,
      easing: 'easeOutQuad'
    });
  }
};

export const animateCardLeave = (element) => {
  if (!element) return;
  safeAnime({
    targets: element,
    translateY: 0,
    scale: 1,
    boxShadow: '0 5px 25px rgba(0, 255, 255, 0.2)',
    duration: 200,
    easing: 'easeOutQuad'
  });

  const cardContent = element.querySelectorAll('.card-content > *');
  if (cardContent.length > 0) {
    safeAnime({
      targets: cardContent,
      translateX: 0,
      opacity: 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  }
};

// Simplified functions for other animations
export const animateTextHover = (element) => {
  if (!element || !anime) return;
  // Simple fallback animation
  element.style.transform = 'scale(1.05)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 300);
};

export const animateHeroElements = () => {
  if (!anime) return;
  // Will be implemented when anime loads
};

export const animateStatsCounter = (element, targetValue) => {
  if (!element) return;
  // Simple counter without anime
  let current = 0;
  const increment = targetValue / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= targetValue) {
      current = targetValue;
      clearInterval(timer);
    }
    element.textContent = Math.round(current);
  }, 20);
};

export const createFloatingAnimation = (elements) => {
  if (!elements || elements.length === 0) return;
  // CSS-based floating animation fallback
  elements.forEach(element => {
    element.style.animation = 'float 6s ease-in-out infinite';
  });
};

export const createCursorAnimation = () => {
  if (typeof window === 'undefined') return;
  // Simple cursor following
  let cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  }

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
};

export const createParticleSystem = (container) => {
  if (!container) return;
  // Simple particle effect
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: radial-gradient(circle, #00ffff, #ff00ff);
      border-radius: 50%;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat 4s infinite linear;
    `;
    container.appendChild(particle);
  }
};

export const createMatrixRain = (container) => {
  if (!container) return;
  // Simple matrix effect
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  for (let i = 0; i < 10; i++) {
    const drop = document.createElement('div');
    drop.className = 'matrix-drop';
    drop.style.cssText = `
      position: absolute;
      color: #00ffff;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      font-weight: bold;
      text-shadow: 0 0 10px #00ffff;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      animation: matrixFall ${3 + Math.random() * 5}s infinite linear;
    `;
    drop.textContent = chars[Math.floor(Math.random() * chars.length)];
    container.appendChild(drop);
  }
};

export const animatePageEnter = () => {
  // Simple fade in
  const elements = document.querySelectorAll('main, .page-content');
  elements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
};

export const animatePageExit = () => {
  // Simple fade out
  return Promise.resolve();
};