import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";
import { registerCommands } from "../init";
/**
 * This is the highest level component!
 */
interface RegisterCommandProps {
  registerCommands: () => void;
}

const RegisterCommand: React.FC<RegisterCommandProps> = (props) => {
  props.registerCommands();
};

function App() {
  // Type script as its declaring and intializing variables?
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Javascript as thats what we need to return
  //the div that  will rerender once isLoggedIn is changed
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>
      <div>
        <RegisterCommand registerCommands={registerCommands} />
        {isLoggedIn && <REPL />}
      </div>
    </div>
  );
}

export default App;
