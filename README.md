> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
- **Project Name:** cs32-sprint3-mock
- **Description:** A mock project for Brown CSCI0320 Sprint 3, focusing on developing a Read-Eval-Print Loop (REPL) interface for command execution and display.
- **Team Members:**
  - Xinyang Cai
  - Jiaming Lin
- **Estimated Time Taken:** 40 hours
- **Repository Link:** [GitHub Repo](https://github.com/cs0320-s24/mock-candice-jaz)

# Design Choices
- We utilized React for building the user interface, particularly for the REPL component, to manage state effectively across user interactions.
- The `commandRegistry` pattern was used to decouple command definitions from execution logic, allowing for easier addition and management of commands.
- CSS modules were employed for styling to scope styles to components, preventing global namespace pollution.

# Errors/Bugs
N/A

# Tests
- Unit tests for command registry logic ensure commands are registered, executed, and errors handled correctly.
- End-to-end tests using Playwright verify the application's behavior from a user's perspective, including command execution and UI updates.

# How to
- **Run Tests:**
  - Unit Tests: `npm run test:unit`
  - End-to-End Tests: `npx playwright test`
- **Build and Run:**
  - `npm install` to install all the necessary dependencies
  - `npm run start` to start the application

# How to Run Commands

## For Users
After starting the application, users can interact with the REPL interface directly in the web browser. Here are some common commands you can run:

- **Switch Output Mode:** To toggle between 'brief' and 'verbose' output modes, type `mode`. By default the mode is brief.
- **Load a CSV File:** To load data from a CSV file, use the command `load_file` followed by the mock file path. Example: `load_file /fakepath/to/peopleCSV.csv`.
- **View CSV Data:** To display the currently loaded CSV data, simply enter `view`.
- **Search in CSV Data:** To search for specific data within a column, use `search` followed by the column name or index and the value you're searching for. Example: `search State RI` or `search 0 RI`.

## For Developers
Developers looking to add or modify commands within the REPL interface should follow these steps:

1. **Adding a New Command:**
   - Navigate to the `commandRegistry` module within the project.
   - Use registerCommand method to add a new command to the commands map.
```
Example:
typescript
// Inside commandRegistry.ts
export const commandRegistry: { [key: string]: REPLFunction } = {
...,
"new_command": (args: Array<string>): String => {
// Command logic here
return "Command output here";
}
};
```

2. **Removing an Existing Command:**
   - Locate the command's function within the `commandRegistry` module.
   - Create a new method to remove the existing command from the commands map 



# Collaboration
- We collaborated with our course TA for debugging the REPL component state management.
- Utilized ChatGPT for checking and explaining REACT syntax

*Please refer to the course's collaboration policy for any further questions.*