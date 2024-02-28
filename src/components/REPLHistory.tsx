import "../styles/main.css";

interface REPLHistoryProps {
  // Adjust the type to include both strings and arrays of strings
  history: (string | string[])[];
  commandHistory: (string | string[])[];
  isBrief: boolean;
}

export function REPLHistory(props: REPLHistoryProps) {
    // Adjust the helper function to correctly type check for an array of strings
    const isArrayOfArrays = (item: any): item is string[][] => 
    Array.isArray(item) && item.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string'));

  return (
    <div className="repl-history">
      {props.history.map((item, index) => {
        if (isArrayOfArrays(item)) {
          return (
            <table key={index} className="centered-table">
              <tbody>
                {item.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        } else {
          // Ensure item is treated as a string here
          return (
            <div>
              {
                props.isBrief? null:
                  <p className="inline-output">{props.commandHistory[index] as string}</p>
              }
              <p key={index} className="inline-output">{props.history[index] as string}</p>
            </div>
          );
        }
      })}
    </div>
  );
}