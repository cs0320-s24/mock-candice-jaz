export interface REPLFunction {
    (args: Array<string>): String | String[][];
}

class CommandRegistry {
    private commands = new Map<string, REPLFunction>();

    registerCommand(name: string, func: REPLFunction) {
        this.commands.set(name, func);
    }

    executeCommand(name: string, args: Array<string>): String | String[][] {
        const func = this.commands.get(name);
        if (!func) {
            throw new Error(`Command "${name}" not found`);
        }
        return func(args);
    }
}

export const commandRegistry = new CommandRegistry();