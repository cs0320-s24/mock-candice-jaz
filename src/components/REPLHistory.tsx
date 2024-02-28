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

    const renderOutput = (output: string | string[] | string[][], index: number) => {
      if (isArrayOfArrays(output)) {
        // For table outputs, return the table element
        return (
          <>
            {!props.isBrief && <div>Output:</div>}
            <table key={index} className="centered-table">
              <tbody>
                {output.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      } else if (Array.isArray(output)) {
        // For array outputs, return each line in a new div
        return (
          <>
            {!props.isBrief && <div>Output:</div>}
            {output.map((line, lineIndex) => <div key={`${index}-${lineIndex}`} className="inline-output">{line}</div>)}
          </>
        );
      } else {
        // For single line outputs, return the line next to "Output:"
        return <>{!props.isBrief && <span>Output: </span>}{output}</>;
      }
    };
  
    return (
      <div className="repl-history">
        {props.history.map((item, index) => {
          const command = props.commandHistory[index];
          const output = item;
  
          return (
            <div key={index} className="history-entry">
              {!props.isBrief && (
                <div className="command-line">Command: {command as string}</div>
              )}
              <div className="output-line">
                {renderOutput(output, index)}
              </div>
            </div>
          );
        })}
      </div>
    );
}