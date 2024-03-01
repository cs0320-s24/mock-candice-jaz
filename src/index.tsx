import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';

/**
 * Simplifies the initial setup by removing unnecessary boilerplate.
 * This approach is tailored for an older version of React to maintain compatibility.
 * 
 * @version 1.0
 * @author Your Name
 */

// Initialize the root element for React rendering.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the main application within React's StrictMode for highlighting potential problems.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);