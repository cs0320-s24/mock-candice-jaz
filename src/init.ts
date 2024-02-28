import { commandRegistry } from './utils/commandRegistry';
import { mockedFilePathsToData } from './MockedJson';
import { useState } from "react";



// Register all the commands the webapp needs on startup
export function registerCommands() {
    commandRegistry.registerCommand('greet', (args) => `Hello, ${args.join(' ')}`);
    commandRegistry.registerCommand('sum', (args) => args.map(Number).reduce((acc, curr) => acc + curr, 0).toString());

    // New code below
    // let currentCSV: string[][] | null = null;
    let currentCSV: string[][] | null = null;
    commandRegistry.registerCommand('loadcsv', (args) => {
        const filePath = args[0];
        if (!mockedFilePathsToData[filePath]) {
            return 'Error: File not found';
        }
        currentCSV = mockedFilePathsToData[filePath];
        return 'CSV loaded successfully';
    });

    commandRegistry.registerCommand('view', () => {
        if (!currentCSV) {
            return 'Error: No CSV loaded'; // Returns String
        }

        return currentCSV; // Returns String[][]
    });

    commandRegistry.registerCommand('search', (args) => {
        if (!currentCSV) {
            return 'Error: No CSV loaded';
        }
        const searchTarget = args[0];
        let columnIndex: number;
        let isHeaderPresent = currentCSV[0].includes(searchTarget);
    
        if (isHeaderPresent) {
            columnIndex = currentCSV[0].indexOf(searchTarget);
        } else {
            columnIndex = parseInt(searchTarget);
            if (isNaN(columnIndex) || columnIndex < 0 || columnIndex >= currentCSV[0].length) {
                return `Error: Invalid column index`;
            }
        }
    
        const searchValue = args[1];
        const searchResults = currentCSV.filter((row, index) => 
            (isHeaderPresent && index > 0 || !isHeaderPresent) && row[columnIndex] === searchValue
        );
        return searchResults.length > 0 ? searchResults : 'No results found';
    });
}