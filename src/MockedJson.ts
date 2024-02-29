// MockedJson.ts

// Define the type for the data structure
export type MockedFilePathsToData = {
  [key: string]: string[][];
};

export type MockedSearchResults = {
  [csvPath: string]: {
    [query: string]: (string | string[][]);
  };
};

// with header
export const peopleCSV = [
  ["State", "Race", "Earnings", "Workers", "Disparity", "Percent"],
  ["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
  ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
  ["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
  ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
  ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
  ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"],
];

// no header
export const starCSV = [
  ["0", "Sol", "0", "0", "0"],
  ["1", "Andreas", "282.43485", "0.00449", "5.36884"],
  ["2", "Rory", "43.04329", "0.00285", "-15.24144"],
  ["3", "Mortimer", "277.11358", "0.02422", "223.27753"],
  ["4", "Bailee", "79.62896", "0.01164", "-101.53103"],
  ["5", "Zita", "264.58918", "0.04601", "-226.71007"],
  ["6", "Araceli", "53.06535", "0.0168", "3.66089"],
  ["7", "Casey", "52.95794", "0.02084", "19.31343"],
];

export const mockedSearchResultsByCSV: MockedSearchResults = {
  "/fakepath/to/peopleCSV.csv": {
    "County Providence": "Column 'County' does not exist",
    "Race White": [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"]],
    "Race Pink": "No results found for Race = Pink",
    "State RI": [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
                ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
                ["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
                ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
                ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
                ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]],
    "0 RI": [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
            ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
            ["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
            ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
            ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
            ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]],
    "AND(Race Black, State RI)": [["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"]],
    "OR(Race Black, State RI)": [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
                                ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
                                ["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
                                ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
                                ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
                                ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]],
    "NOT(Race White)": [["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
                      ["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
                      ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
                      ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
                      ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]],
    "AND(NOT(Race Black, State RI), NOT(Race White, State RI))": [["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
                                                                  ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
                                                                  ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
                                                                  ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]]
  },
  "/fakepath/to/starCSV.csv": {
    "1 Sol": [["0", "Sol", "0", "0", "0"],],
    "1 Jazlyn": "No results found",
    "Name Jazlyn": "Column name 'Name' doesn't exist",
    "AND(0 0, 1 Sol)": [["0", "Sol", "0", "0", "0"]],
    "NOT(1 Jazlyn)": [["0", "Sol", "0", "0", "0"],
                      ["1", "Andreas", "282.43485", "0.00449", "5.36884"],
                      ["2", "Rory", "43.04329", "0.00285", "-15.24144"],
                      ["3", "Mortimer", "277.11358", "0.02422", "223.27753"],
                      ["4", "Bailee", "79.62896", "0.01164", "-101.53103"],
                      ["5", "Zita", "264.58918", "0.04601", "-226.71007"],
                      ["6", "Araceli", "53.06535", "0.0168", "3.66089"],
                      ["7", "Casey", "52.95794", "0.02084", "19.31343"]],
    "OR(1 Jazlyn, 1 Sol)": [["0", "Sol", "0", "0", "0"],],
    "AND(AND(0 0, 1 Sol), 2 1)": "No results found"
  },
};

export function getMockedSearchResultsForCSV(csvPath: string, query: string): string | string[][] {
  if (!mockedSearchResultsByCSV.hasOwnProperty(csvPath)) {
    return "Error: CSV path not recognized";
  }
  const csvQueries = mockedSearchResultsByCSV[csvPath];
  
  if (!csvQueries.hasOwnProperty(query)) {
    return "Error: Query not recognized by mocked search data";
  }
  return csvQueries[query];
}

// Apply the type to your object otherwise TypeScript error
export const mockedFilePathsToData: MockedFilePathsToData = {
  "/fakepath/to/peopleCSV.csv": peopleCSV,
  "/fakepath/to/starCSV.csv": starCSV,
};
