// MockedJson.ts

export const exampleCSV1 = [
  [1, 2, 3, 4, 5],
  ["The", "song", "remains", "the", "same."],
];

export const exampleCSV2 = [
  [6, 7, 8, 9, 10],
  ["Stairway", "to", "heaven."],
];

export const mockedFilePathsToData = {
  "/fakepath/to/csv1.csv": exampleCSV1,
  "/fakepath/to/csv2.csv": exampleCSV2,
};
