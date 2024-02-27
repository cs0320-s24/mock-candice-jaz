import { commandRegistry } from './utils/commandRegistry';
import { mockedFilePathsToData } from './MockedJson';


// Register all the commands the webapp needs on startup
export function registerCommands() {
    commandRegistry.registerCommand('greet', (args) => `Hello, ${args.join(' ')}`);
    commandRegistry.registerCommand('sum', (args) => args.map(Number).reduce((acc, curr) => acc + curr, 0).toString());

    // New code below
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

    // commandRegistry.registerCommand('search', (args) => {
    //     if (!currentCSV) {
    //         return 'Error: No CSV loaded';
    //     }
    //     const [column, value] = args;
    // });
}