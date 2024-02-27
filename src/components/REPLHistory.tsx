import "../styles/main.css"; // Importing CSS for styling the REPLHistory component

// Defining the props structure for the REPLHistory component
interface REPLHistoryProps {
  history: string[]; // Array of command history strings
  mode: "brief" | "verbose"; // Mode of operation, can be either 'brief' or 'verbose'
}
// Functional component to display the history of commands
function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {" "}
      {/* Container for the command history display */}
      {/* Iterating over each command in the history array and displaying it */}
      {props.history.map((command, index) => (
        <p key={index}>{command}</p> // Displaying each command in a paragraph tag
      ))}
    </div>
  );
}

export default REPLHistory;
