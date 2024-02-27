import { commandRegistry } from './utils/commandRegistry';

// Register all the commands the webapp needs on startup
export function registerCommands() {
    commandRegistry.registerCommand('greet', (args) => `Hello, ${args.join(' ')}`);
    commandRegistry.registerCommand('sum', (args) => args.map(Number).reduce((acc, curr) => acc + curr, 0).toString());
}