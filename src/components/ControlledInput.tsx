import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Defines the properties required by the ControlledInput component.
 * 
 * @param value The current value of the input.
 * @param setValue A React dispatch function to update the state of the input value.
 * @param ariaLabel Accessibility label for the input element.
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * A controlled input component that encapsulates an input element to manage its state within React.
 * 
 * This component ensures that the input box's state is controlled by React, allowing for more predictable
 * data flow and state management. It accepts a value, a function to update this value, and an ariaLabel
 * for accessibility purposes.
 * 
 * @param props An object containing the value, setValue function, and ariaLabel for the input.
 * @returns A text input element that is controlled by React state.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
