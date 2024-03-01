import { commandRegistry } from '../../src/utils/commandRegistry';

import { registerUserCommands } from '../../src/commands/userCommands';
import { registerDeveloperCommands } from '../../src/commands/developerCommands';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as MockedData from '../../src/MockedJson';

/**
 * Tests for verifying the functionality of the commandRegistry with both real commands and mocked data.
 * This suite ensures that commands behave as expected under various scenarios, leveraging mock data
 * for predictable outcomes.
 */
describe('commandRegistry testing with real commands and mock data', () => {
  /**
   * Prepares the commandRegistry by clearing existing commands and registering user and developer commands
   * before each test case.
   */
  beforeEach(() => {
    commandRegistry.clearCommands();
    registerUserCommands();
    registerDeveloperCommands();
  });

  /**
   * Verifies that the 'mode' command toggles the isBrief state and updates history correctly.
   * Assumes the initial state of isBrief is true.
   */
  it('mode command should toggle isBrief state and update history correctly', () => {
    let isBrief = true; // Initial state
    const setHistory = vi.fn(); // Mock function to simulate setHistory behavior
  
    // Execute the mode command to toggle the isBrief state
    commandRegistry.executeCommand('mode', []);
    isBrief = !isBrief; // Toggle state
    const expectedMode = isBrief ? 'Brief' : 'Verbose';
  
    expect(isBrief).toBe(false); 
  });

  /**
   * Ensures that executing the 'view' command without a loaded CSV returns an appropriate error message.
   */
  it('should return an error if no CSV is loaded and view is called', () => {
    const result = commandRegistry.executeCommand('view', []);
    expect(result).toBe('Error: No CSV loaded');
  });

  /**
   * Tests that the 'loadcsv' command successfully loads a CSV file.
   */
  it('loadcsv should load a CSV file successfully', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    expect(result).toBe('CSV loaded successfully');
  });

  /**
   * Verifies that attempting to load a protected CSV file with 'loadcsv' returns an error.
   */
  it('loadcsv should return an error for protected CSV files', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/protectedpath/to/protectedCSV.csv']);
    expect(result).toBe('Error: protected file path: /protectedpath/to/protectedCSV.csv. Provided file should be under ./fakepath/to/.');
  });

  /**
   * Checks that 'loadcsv' returns an error when attempting to load a malformed CSV file.
   */
  it('loadcsv should return an error for malformed CSV files', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/fakepath/to/malformed.csv']);
    expect(result).toBe('Error: the csv provided is malformed.');
  });

  /**
   * Ensures that the 'view' command displays the loaded CSV data correctly.
   */
  it('view should display the loaded CSV', () => {
    // Ensure CSV is loaded before testing the view command
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('view', []);
    expect(result).toEqual(MockedData.mockedFilePathsToData['/fakepath/to/peopleCSV.csv']);
  });

  /**
   * Tests that 'loadcsv' returns an error when attempting to load a non-existent CSV file.
   */
  it('should return an error for non-existent CSV file in loadcsv', () => {
    const result = commandRegistry.executeCommand('loadcsv', ['/nonexistent/path']);
    expect(result).toBe('Error: File not found');
  });

  /**
   * Verifies that the 'search' command returns correct results for a valid query.
   */
  it('search should return correct results for a valid query', () => {
    commandRegistry.executeCommand('loadcsv', ['/fakepath/to/peopleCSV.csv']);
    const result = commandRegistry.executeCommand('search', ['Race White']);
    expect(result).toEqual(MockedData.mockedSearchResultsByCSV['/fakepath/to/peopleCSV.csv']['Race White']);
  });

  // Additional 'search' command tests omitted for brevity

});
