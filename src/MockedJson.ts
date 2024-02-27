// MockedJson.ts

// Define the type for the data structure
export type MockedFilePathsToData = {
  [key: string]: string[][];
};

export const exampleCSV1 = [
  ["1", "2", "3", "4", "5"],
  ["The", "song", "remains", "the", "same."],
];

export const exampleCSV2 = [
  ["1", "2", "3", "4", "5"],
  ["Stairway", "to", "heaven."],
];

// Apply the type to your object otherwise TypeScript error
export const mockedFilePathsToData: MockedFilePathsToData = {
  "/fakepath/to/csv1.csv": exampleCSV1,
  "/fakepath/to/csv2.csv": exampleCSV2,
};
