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
export const exampleCSV1 = [
  ["State", "Type", "Earnings", "Workers", "Disparity", "Percent"],
  ["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
  ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
  ["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
  ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
  ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
  ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"],
];

// no header
export const exampleCSV2 = [
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
  "/fakepath/to/csv1.csv": {
    "search Type White": [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"]],
    "search Type Pink": "No results found",
  },
  "/fakepath/to/csv2.csv": {
    "search Sol Andreas": [["1", "Andreas", "282.43485", "0.00449", "5.36884"]],
    "search Sol Jazlyn": "No results found",
  },
};

export function getMockedSearchResultsForCSV(csvPath: string, query: string): string | string[][] {
  if (!mockedSearchResultsByCSV.hasOwnProperty(csvPath)) {
    return "Error: CSV path not recognized";
  }
  const csvResults = mockedSearchResultsByCSV[csvPath];
  
  if (!csvResults.hasOwnProperty(query.trim())) {
    return "Error: Query not recognized";
  }
  return csvResults[query.trim()];
}

// Apply the type to your object otherwise TypeScript error
export const mockedFilePathsToData: MockedFilePathsToData = {
  "/fakepath/to/csv1.csv": exampleCSV1,
  "/fakepath/to/csv2.csv": exampleCSV2,
};
