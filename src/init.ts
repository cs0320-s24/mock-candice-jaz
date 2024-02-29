import { registerUserCommands } from "./commands/userCommands";
import { registerDeveloperCommands } from "./commands/developerCommands";

export function registerCommands() {
  registerUserCommands();
  registerDeveloperCommands();
}
