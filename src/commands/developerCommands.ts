import { commandRegistry } from "../utils/commandRegistry";

/**
 * Registers developer-specific commands within the application.
 * 
 * This function utilizes the commandRegistry to register commands that are
 * intended for developer use. It demonstrates the registration of two commands:
 * - "greet": Concatenates all arguments into a greeting message.
 * - "sum": Calculates the sum of all numerical arguments provided.
 */
export function registerDeveloperCommands() {
  // Registers a command that greets the user with the provided name(s).
  commandRegistry.registerCommand(
    "greet",
    (args) => `Hello, ${args.join(" ")}`
  );

  // Registers a command that calculates the sum of provided numerical arguments.
  commandRegistry.registerCommand("sum", (args) =>
    args
      .map(Number) // Converts all arguments to numbers.
      .reduce((acc, curr) => acc + curr, 0) // Calculates the sum.
      .toString() // Converts the sum back to a string for output.
  );
}
