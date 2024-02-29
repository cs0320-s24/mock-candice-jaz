import { commandRegistry } from "../utils/commandRegistry";
import {
  mockedFilePathsToData,
  getMockedSearchResultsForCSV,
} from "../MockedJson";
export function registerUserCommands() {
  // Assuming these variables are part of your command's state
  let currentFilepath: string | null = null;
  let currentCSV: string | string[][] | null = null;

  // Load CSV Command
  commandRegistry.registerCommand("loadcsv", (args) => {
    currentCSV = null; //everytime user enters loadcsv, we clear out currentCSV cache
    if (args.length === 0) {
      return "Error: No file path was provided for loadcsv";
    }
    currentFilepath = args[0];
    if (!mockedFilePathsToData[currentFilepath]) {
      return "Error: File not found";
    }

    let output = mockedFilePathsToData[currentFilepath];
    if (typeof output === "string") {
      //find an error,
      return output;
    }
    currentCSV = output;
    return "CSV loaded successfully";
  });

  // View CSV Command
  commandRegistry.registerCommand("view", () => {
    if (!currentCSV || currentFilepath == null) {
      return "Error: No CSV loaded";
    }
    return currentCSV;
  });

  // Search CSV Command
  commandRegistry.registerCommand("search", (args) => {
    if (args.length === 0) {
      return "Error: No query was provided for search";
    }

    if (currentFilepath === null) {
      return "Error: No CSV loaded";
    }
    if (!currentCSV) {
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
