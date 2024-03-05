import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { commandRegistry } from "../utils/commandRegistry";

/**
 * Defines the properties required by the REPLInput component.
 * 
 * @param history An array of previously submitted commands or command outputs.
 * @param commandHistory An array of command strings that have been submitted.
 * @param setHistory A function to update the history state.
 * @param setCommandHistory A function to update the command history state.
 * @param isBrief A boolean indicating if the output should be displayed in brief mode.
 * @param setIsBrief A function to toggle the brief mode state.
 */
interface REPLInputProps {
  history: (string | string[])[];
  commandHistory: (string | string[])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  isBrief: boolean;
  setIsBrief: Dispatch<SetStateAction<boolean>>;
}

/**
 * A component for inputting commands in the REPL interface.
 * 
 * This component manages the input field for commands, handling the submission and state updates
 * for both the command and its output in the history. It utilizes the commandRegistry to execute
 * commands and manage the output.
 * 
 * @param props The properties required by the REPLInput component.
 * @returns A div element containing the input field and submission button.
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  /**
   * Handles the submission of a command.
   * 
   * This function splits the input string into a command and its arguments, executes the command
   * using the commandRegistry, and updates the history and command history states with the output
   * or error message. It also resets the input field and updates the brief mode state.
   * 
   * @param commandString The command string input by the user.
   */
  function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.split(" ");
    try {
      const output = commandRegistry.executeCommand(command, args);
      props.setHistory([...props.history, output]);
    } catch (error: any) {
      props.setHistory([...props.history, `${error.message}`]);
    }
    props.setIsBrief(commandRegistry.getIsBrief());
    props.setCommandHistory([...props.commandHistory, commandString]);
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Query! </button>
    </div>
  );
}
