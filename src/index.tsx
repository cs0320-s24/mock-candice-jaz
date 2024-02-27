// Importing necessary modules and styles
import React from 'react'; // Import React to use JSX
import ReactDOM from 'react-dom/client'; // Import ReactDOM for DOM manipulation
import './styles/index.css'; // Importing global CSS styles
import App from './components/App'; // Import the main App component

// Tim removed some boilerplate to keep things simple.
// We're using an older version of React here. 

// Creating a root container where the React app will be attached
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// Rendering the App component inside the root container in strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);