import "../styles/main.css"; // Importing CSS for styling the REPLInput component
import { Dispatch, SetStateAction, useState } from "react"; // Importing necessary hooks and types from React for state management
import { ControlledInput } from "./ControlledInput"; // Importing the ControlledInput component for controlled form input

// Defining the props structure for the REPLInput component to specify the expected types
interface REPLInputProps {
  history: string[]; // Array of command history strings
  setHistory: Dispatch<SetStateAction<string[]>>; // Function to update the command history
  mode: 'brief' | 'verbose'; // Mode of operation, can be either 'brief' or 'verbose'
  setMode: Dispatch<SetStateAction<'brief' | 'verbose'>>; // Function to update the mode of operation
}

interface CommandHistory {
  command: string;
  output: any; // Adjust based on your actual data structure
}

function REPLInput(props: REPLInputProps) {
  // useState hook to manage the command string state within the component
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit(commandString: string) {
    if (commandString === 'view') {
      const newMode = commandString.split(' ')[1];
      if (['brief', 'verbose'].includes(newMode)) {
        props.setMode(newMode);
        if (newMode === 'verbose') {
          props.setHistory([...props.history, `Command: ${commandString}\nOutput: Mode changed to ${newMode}`]);
        }
      }
    } else if (commandString === 'view') {
      // Assuming exampleCSV1 is available in the scope or imported
      const result = `[[1, 2, 3, 4, 5], ["The", "song", "remains", "the", "same."]]`;
      const displayText = props.mode === 'brief' ? result : `Command: ${commandString}\nOutput: ${result}`;
      props.setHistory([...props.history, displayText]);
    }
    setCommandString("");
  }

  return (
    <div className="repl-input">
      {/* Fieldset groups related elements and provides a legend for the group, enhancing accessibility */}
      <fieldset>
        <legend>Enter a command:</legend>
        {/* ControlledInput component for the command input, with state management for its value */}
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* Button to submit the command, displaying the count of submissions */}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times!{" "}
      </button>
    </div>
  );
}

export default REPLInput;

