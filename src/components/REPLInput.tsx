import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { commandRegistry } from "../utils/commandRegistry";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands\
  history: (string | string[])[];
  commandHistory: (string | string[])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  isBrief: boolean;
  setIsBrief: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);

  function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.split(' ');
    if (command=='mode'){
      props.setIsBrief(!props.isBrief);
      const currMode = !props.isBrief? 'Brief':'Verbose';
      const modeOutput =  'Change output mode to ' + currMode;
      props.setHistory([...props.history, modeOutput]);
    } else {
      try {
        const output = commandRegistry.executeCommand(command, args);
        props.setHistory([...props.history, output]);
      } catch (error: any) {
        props.setHistory([...props.history, `${error.message}`]);
      }

    }
    props.setCommandHistory([...props.commandHistory, commandString])
    setCommandString("");
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Query!{" "}
      </button>
    </div>
  );
}
