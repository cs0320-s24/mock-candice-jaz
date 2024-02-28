import { commandRegistry } from './utils/commandRegistry';
import { mockedFilePathsToData } from './MockedJson';
import { useState } from "react";

import { getMockedSearchResultsForCSV } from './MockedJson';

// Register all the commands the webapp needs on startup
export function registerCommands() {
    commandRegistry.registerCommand('greet', (args) => `Hello, ${args.join(' ')}`);
    commandRegistry.registerCommand('sum', (args) => args.map(Number).reduce((acc, curr) => acc + curr, 0).toString());

    // New code below
    let currentFilepath: string | null;
    let currentCSV: string[][] | null = null;
    commandRegistry.registerCommand('loadcsv', (args) => {
        currentFilepath = args[0];
        if (!mockedFilePathsToData[currentFilepath]) {
            return 'Error: File not found';
        }
        currentCSV = mockedFilePathsToData[currentFilepath];
        return 'CSV loaded successfully';
    });

    commandRegistry.registerCommand('view', () => {
        if (!currentCSV || currentFilepath == null) {
            return 'Error: No CSV loaded'; // Returns String
        }

        return currentCSV; // Returns String[][]
    });

    commandRegistry.registerCommand('search', (args) => {
        if (!currentCSV || currentFilepath == null) {
            return 'Error: No CSV loaded';
        }
        const searchQuery = args.join(' '); // Combine args into a single search query string
        const searchResults = getMockedSearchResultsForCSV(currentFilepath, searchQuery);
        return searchResults;
    });
}