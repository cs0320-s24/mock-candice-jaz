import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/** 
 * The REPL component serves as the top-level component for the Read-Eval-Print Loop interface.
 * It manages the state for the command history and the brief mode toggle, and renders the REPLHistory
 * and REPLInput components. This component demonstrates how props can be used to pass state and state
 * setters down the component tree, facilitating shared state management across sibling components.
 * 
 * @remarks
 * This component is designed to be expanded with additional functionality in future sprints.
 * 
 * @todo
 * Implement a shared state mechanism to synchronize command history between REPLInput and REPLHistory.
 */
export default function REPL() {
  // State hook for maintaining the list of commands entered.
  const [history, setHistory] = useState<string[]>([]);
  // State hook for maintaining a separate command history, potentially for future use.
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  // State hook for toggling the brief mode on and off.
  const [isBrief, setIsBrief] = useState(true);

  return (
    <div className="repl">
      {/* Render the REPLHistory component, passing the necessary state as props. */}
      <REPLHistory history={history} commandHistory={commandHistory} isBrief={isBrief}/>
      <hr></hr>
      {/* Render the REPLInput component, passing the necessary state and state setters as props. */}
      <REPLInput history={history} setHistory={setHistory} commandHistory={commandHistory} setCommandHistory={setCommandHistory} isBrief={isBrief} setIsBrief={setIsBrief} />
    </div>
  );
}
