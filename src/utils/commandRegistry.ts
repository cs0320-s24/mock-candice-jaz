export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

class CommandRegistry {
  private commands = new Map<string, REPLFunction>();
  private isBrief = true;

  registerCommand(name: string, func: REPLFunction) {
    this.commands.set(name, func);
  }

  executeCommand(name: string, args: Array<string>): String | String[][] {
    const func = this.commands.get(name);
    if (!func) {
      return `Error: Command "${name}" not found`;
    }
    return func(args);
  }

  switchMode() {
    this.isBrief = !this.isBrief;
  }

  getIsBrief() {
    return this.isBrief;
  }
}

export const commandRegistry = new CommandRegistry();
