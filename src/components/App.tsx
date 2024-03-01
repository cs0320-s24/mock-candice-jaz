import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";
import { registerCommands } from "../init";

/**
 * Props for RegisterCommand component.
 * 
 * @param registerCommands Function to register commands for the application.
 */
interface RegisterCommandProps {
  registerCommands: () => void;
}

/**
 * Component responsible for registering commands.
 * 
 * @param props Contains a function to register commands.
 */
const RegisterCommand: React.FC<RegisterCommandProps> = (props) => {
  props.registerCommands();
};

/**
 * The main application component.
 * 
 * This component manages the login state and renders the application's main interface,
 * including the login button and, conditionally, the REPL component if the user is logged in.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
