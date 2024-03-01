import "../styles/main.css";

/**
 * Defines the properties required by the REPLHistory component.
 * 
 * @param history An array of command outputs, each can be a string, an array of strings, or an array of array of strings.
 * @param commandHistory An array of commands entered by the user.
 * @param isBrief A boolean indicating if only the output should be displayed without the command.
 */
interface REPLHistoryProps {
  history: (string | string[])[];
  commandHistory: (string | string[])[];
  isBrief: boolean;
}

/**
 * Renders the history of commands and their outputs in the REPL interface.
 * 
 * This component displays each command and its corresponding output. The output can be a single line, 
 * an array of lines, or a table represented by an array of arrays of strings. The display can be toggled 
 * between brief and full mode, where brief mode only shows the outputs.
 * 
 * @param props The properties required by the REPLHistory component.
 * @returns A div element containing the history of commands and outputs.
 */
export function REPLHistory(props: REPLHistoryProps) {
    /**
     * Checks if the provided item is an array of arrays of strings.
     * 
     * @param item The item to check.
     * @returns True if the item is an array of arrays of strings, false otherwise.
     */
    const isArrayOfArrays = (item: any): item is string[][] => 
    Array.isArray(item) && item.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'string'));

    /**
     * Renders the output based on its type.
     * 
     * This function checks if the output is a table, an array of lines, or a single line, and renders it accordingly.
     * 
     * @param output The output to render.
     * @param index The index of the output in the history array.
     * @returns A JSX element representing the output.
     */
    const renderOutput = (output: string | string[] | string[][], index: number) => {
      if (isArrayOfArrays(output)) {
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
        return (
          <>
            {!props.isBrief && <div>Output:</div>}
            {output.map((line, lineIndex) => <div key={`${index}-${lineIndex}`} className="inline-output">{line}</div>)}
          </>
        );
      } else {
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