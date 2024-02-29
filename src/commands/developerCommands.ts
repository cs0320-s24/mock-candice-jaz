import { commandRegistry } from '../utils/commandRegistry';

// Example developer command
commandRegistry.registerCommand('greet', (args) => `Hello, ${args.join(' ')}`);
commandRegistry.registerCommand('sum', (args) => args.map(Number).reduce((acc, curr) => acc + curr, 0).toString());