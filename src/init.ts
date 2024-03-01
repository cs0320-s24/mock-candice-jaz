import { registerUserCommands } from "./commands/userCommands";
import { registerDeveloperCommands } from "./commands/developerCommands";

/**
 * Initializes the application by registering both user and developer commands.
 * This setup ensures that all necessary commands are available for execution
 * within the application's command-line interface.
 */
export function registerCommands() {
  registerUserCommands();
  registerDeveloperCommands();
}
