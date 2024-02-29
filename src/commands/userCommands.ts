import { commandRegistry } from '../utils/commandRegistry';
import { mockedFilePathsToData, getMockedSearchResultsForCSV } from '../MockedJson';

// Assuming these variables are part of your command's state
let currentFilepath: string | null = null;
let currentCSV: string[][] | null = null;

// Load CSV Command
commandRegistry.registerCommand('loadcsv', (args) => {
    currentFilepath = args[0];
    if (!mockedFilePathsToData[currentFilepath]) {
        return 'Error: File not found';
    }
    currentCSV = mockedFilePathsToData[currentFilepath];
    return 'CSV loaded successfully';
});

// View CSV Command
commandRegistry.registerCommand('view', () => {
    if (!currentCSV || currentFilepath == null) {
        return 'Error: No CSV loaded';
    }
    return currentCSV;
});

// Search CSV Command
commandRegistry.registerCommand('search', (args) => {
    if (currentFilepath == null) {
        return 'Error: No CSV loaded';
    }
    if (!currentCSV) {
        return 'Error: CSV is empty';
    }
    const searchQuery = args.join(' ');
    const searchResults = getMockedSearchResultsForCSV(currentFilepath, searchQuery);
    return searchResults;
});