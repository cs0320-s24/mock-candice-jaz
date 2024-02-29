import { commandRegistry } from "../utils/commandRegistry";

// Example developer command
export function registerDeveloperCommands() {
  commandRegistry.registerCommand(
    "greet",
    (args) => `Hello, ${args.join(" ")}`
  );
  commandRegistry.registerCommand("sum", (args) =>
    args
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0)
      .toString()
  );
}
