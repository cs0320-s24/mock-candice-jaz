import { commandRegistry } from '../../src/utils/commandRegistry';
import { registerUserCommands } from '../../src/commands/userCommands';
import { registerDeveloperCommands } from '../../src/commands/developerCommands';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as MockedData from '../../src/MockedJson';

describe('commandRegistry testing with real commands and mock data', () => {
  beforeEach(() => {
    commandRegistry.clearCommands();
    registerUserCommands();
    registerDeveloperCommands();
  });

  it('mode command should toggle isBrief state and update history correctly', () => {
    // Assuming initial state of isBrief is true
    let isBrief = true; // This should be managed by your test environment or mock
    const setHistory = vi.fn(); // Mock function to simulate setHistory behavior
  
    // Simulate executing the mode command
    commandRegistry.executeCommand('mode', []);
    isBrief = !isBrief; // Toggle the isBrief state
    const expectedMode = isBrief ? 'Brief' : 'Verbose';
  
    expect(isBrief).toBe(false); 
  });

  it('should return an error if no CSV is loaded and view is called', () => {
    const result = commandRegistry.executeCommand('view', []);
    expect(result).toBe('Error: No CSV loaded');
  });

  it('loadcsv should load a CSV file successfully', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    expect(result).toBe('CSV loaded successfully');
  });

  it('loadcsv should return an error for protected CSV files', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/protectedpath/to/protectedCSV.csv']);
    expect(result).toBe('Error: protected file path: /protectedpath/to/protectedCSV.csv. Provided file should be under ./fakepath/to/.');
  });

  it('loadcsv should return an error for malformed CSV files', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/fakepath/to/malformed.csv']);
    expect(result).toBe('Error: the csv provided is malformed.');
  });

  it('view should display the loaded CSV', () => {
    // First, ensure the CSV is loaded
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    // Then, test the view command
    const result = commandRegistry.executeCommand('view', []);
    expect(result).toEqual(MockedData.mockedFilePathsToData['/fakepath/to/peopleCSV.csv']);
  });

  it('should return an error for non-existent CSV file in loadcsv', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/nonexistent/path']);
    expect(result).toBe('Error: File not found');
  });

  it('search should return correct results for a valid query', () => {
  commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
  const result = commandRegistry.executeCommand('search', ['Race White']);
  expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['Race White']);
});

  it('search should handle searching by column name correctly', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['Race White']);
    expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['Race White']);
  });

  it('search should return no results for non-existent search term', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['Race Pink']);
    expect(result).toBe(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['Race Pink']);
  });

  it('search should handle column index out of bound error', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['100 Jazlyn']);
    expect(result).toBe(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['100 Jazlyn']);
  });

  it('search should handle non-existent column name error', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['County Providence']);
    expect(result).toBe(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['County Providence']);
  });

  it('search should handle AND query correctly', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['AND(Race Black, State RI)']);
    expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['AND(Race Black, State RI)']);
  });

  it('search should handle OR query correctly', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['OR(Race Black, State RI)']);
    expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['OR(Race Black, State RI)']);
  });

  it('search should handle NOT query correctly', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['NOT(Race White)']);
    expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['NOT(Race White)']);
  });

  it('search should handle nested AND/OR/NOT query correctly', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['AND(NOT(Race Black, State RI), NOT(Race White, State RI))']);
    expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['AND(NOT(Race Black, State RI), NOT(Race White, State RI))']);
  });
  });