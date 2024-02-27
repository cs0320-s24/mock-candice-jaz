import { useState } from 'react';
import '../styles/App.css';
import { LoginButton } from './LoginButton';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  // Type script as its declaring and intializing variables?
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
 
  // Javascript as thats what we need to return
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      { isLoggedIn && <REPL /> }
    </div>
  );
}

export default App;