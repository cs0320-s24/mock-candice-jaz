import { commandRegistry } from "../utils/commandRegistry";
import {
  mockedFilePathsToData,
  getMockedSearchResultsForCSV,
} from "../MockedJson";

/**
 * Registers user commands for manipulating CSV data.
 * This includes loading, viewing, changing output mode, and searching within CSV files.
 * Utilizes a command registry to manage command execution and state.
 * 
 * @version 1.0
 * @author Your Name
 */
export function registerUserCommands() {
  // Variables to maintain the state of the current CSV file and its data
  let currentFilepath: string | null = null;
  let currentCSV: string | string[][] | null = null;

  /**
   * Command to load a CSV file into the application.
   * Clears the current CSV cache and attempts to load the specified file.
   * 
   * @param args Array of command arguments, expects file path as the first argument.
   * @return A message indicating the result of the operation.
   */
  commandRegistry.registerCommand("loadcsv", (args) => {
    currentCSV = null; // Clear current CSV cache
    if (args.length === 0) {
      return "Error: No file path was provided for loadcsv";
    }
    currentFilepath = args[0];
    if (!mockedFilePathsToData[currentFilepath]) {
      return "Error: File not found";
    }

    let output = mockedFilePathsToData[currentFilepath];
    if (typeof output === "string") {
      // If an error string is returned instead of CSV data
      return output;
    }
    currentCSV = output;
    return "CSV loaded successfully";
  });

  /**
   * Command to view the currently loaded CSV data.
   * 
   * @return The current CSV data or an error message if no CSV is loaded.
   */
  commandRegistry.registerCommand("view", () => {
    if (!currentCSV || currentFilepath == null) {
      return "Error: No CSV loaded";
    }
    return currentCSV;
  });

  /**
   * Command to switch the output mode between brief and verbose.
   * 
   * @return A message indicating the new output mode.
   */
  commandRegistry.registerCommand("mode", () => {
    commandRegistry.switchMode();
    const currMode = commandRegistry.getIsBrief() ? "Brief" : "Verbose";
    const modeOutput = "Change output mode to " + currMode;
    return modeOutput;
  });

  /**
   * Command to search within the currently loaded CSV data.
   * 
   * @param args Array of command arguments, expects search query as arguments.
   * @return Search results or an error message if no CSV is loaded or the query is empty.
   */
  commandRegistry.registerCommand("search", (args) => {
    if (args.length === 0) {
      return "Error: No query was provided for search";
    }

    if (currentFilepath === null) {
      return "Error: No CSV loaded";
    }
    if (currentCSV?.length === 0) {
      return "Error: CSV is empty";
    }
    const searchQuery = args.join(" ");
    const searchResults = getMockedSearchResultsForCSV(
      currentFilepath,
      searchQuery
    );
    return searchResults;
  });
}
