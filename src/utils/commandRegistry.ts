/**
 * Defines the structure for REPL functions that take an array of strings as arguments
 * and return either a string or an array of arrays of strings.
 */
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

/**
 * Manages the registration and execution of commands within a REPL environment.
 * 
 * @version 1.0
 */
class CommandRegistry {
  /**
   * A map storing the association between command names and their corresponding functions.
   */
  private commands = new Map<string, REPLFunction>();

  /**
   * Indicates whether the output should be displayed in brief mode.
   */
  private isBrief = true;

  /**
   * Registers a command with a corresponding function.
   * 
   * @param name The name of the command to register.
   * @param func The function to associate with the command.
   */
  registerCommand(name: string, func: REPLFunction) {
    this.commands.set(name, func);
  }

  /**
   * Executes a command if it is registered.
   * 
   * @param name The name of the command to execute.
   * @param args The arguments to pass to the command function.
   * @return The result of the command execution, or an error message if the command is not found.
   */
  executeCommand(name: string, args: Array<string>): String | String[][] {
    const func = this.commands.get(name);
    if (!func) {
      return `Error: Command "${name}" not found`;
    }
    return func(args);
  }

  /**
   * Clears all registered commands from the registry.
   */
  clearCommands() {
    this.commands.clear();
  }

  /**
   * Toggles the output mode between brief and full.
   */
  switchMode() {
    this.isBrief = !this.isBrief;
  }

  /**
   * Retrieves the current output mode.
   * 
   * @return True if the output mode is set to brief, false otherwise.
   */
  getIsBrief() {
    return this.isBrief;
  }
}

/**
 * An instance of the CommandRegistry class, exported for use in other parts of the application.
 */
export const commandRegistry = new CommandRegistry();
