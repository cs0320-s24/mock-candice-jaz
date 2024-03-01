import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("test 1 check if repl history can hold multiple command history; test search on peopleCSV", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();

  //load a file
  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/peopleCSV.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("CSV loaded successfully")).toBeVisible();

  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Query!" }).click();
  //check if the table is visble
  await expect(
    page.getByRole("table").filter({
      hasText:
        "StateRaceEarningsWorkersDisparityPercentRIWhite$1,058.47395773.6521$1.0075%",
    })
  ).toBeVisible();

  //test search
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search AND(Race Black, State RI)");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(
    page.getByRole("table").filter({
      hasText: /^RIBlack\$770\.2630424\.80376\$0\.736%$/,
    })
  ).toBeVisible();

  //load another file
  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/starCSV.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("CSV loaded successfully").nth(1)).toBeVisible();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Query!" }).click();

  // check if all history are present
  await expect(
    page.getByRole("table").filter({
      hasText:
        "StateRaceEarningsWorkersDisparityPercentRIWhite$1,058.47395773.6521$1.0075%",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("table").filter({ hasText: "0Sol0001Andreas282.434850." })
  ).toBeVisible();
});

test("test 2: view should be error when logged back in", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/peopleCSV.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Query!" }).click();

  //check if the table is visble
  await expect(
    page.getByRole("table").filter({
      hasText:
        "StateRaceEarningsWorkersDisparityPercentRIWhite$1,058.47395773.6521$1.0075%",
    })
  ).toBeVisible();

  await page.getByLabel("Sign Out").click();
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("Error: No CSV loaded").first()).toBeVisible();

  await page.getByPlaceholder("Enter command here!").fill("search xxx");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("Error: No CSV loaded").nth(1)).toBeVisible();
});

test("test 3 functionality of mode, output of search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/starCSV.csv");
  await page.getByRole("button", { name: "Query!" }).click();

  await page
    .getByPlaceholder("Enter command here!")
    .fill("search OR(1 Jazlyn, 1 Sol)");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(
    page.getByRole("table").filter({
      hasText: "0Sol000",
    })
  ).toBeVisible();

  await page
    .getByPlaceholder("Enter command here!")
    .fill("search AND(AND(0 0, 1 Sol), 2 1)");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("No results found")).toBeVisible();

  //mode switch to verbose
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("Command: loadcsv /fakepath/to")).toBeVisible();
  await expect(page.getByText("Output: CSV loaded")).toBeVisible();
  await expect(page.getByText("Command: search OR(1 Jazlyn,")).toBeVisible();
  await expect(page.getByText("Output:0Sol000")).toBeVisible();
  await expect(page.getByText("Command: search AND(AND(0 0,")).toBeVisible();
  await expect(page.getByText("Output: No results found")).toBeVisible();
  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Output: Change output mode to Verbose$/ })
      .locator("span")
  ).toBeVisible();

  //mode switch to brief
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("CSV loaded successfully")).toBeVisible();

  await expect(
    page.getByRole("table").filter({
      hasText: "0Sol000",
    })
  ).toBeVisible();
  await expect(page.getByText("No results found")).toBeVisible();
  await expect(page.getByText("Change output mode to Verbose")).toBeVisible();
  await expect(page.getByText("Change output mode to Brief")).toBeVisible();
});

test("test 4 csv view with a csv of no header", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/peopleCSVNoHeader.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Query!" }).click();
  //test if we can see the table with no header
  await expect(
    page.getByRole("table").filter({
      hasText: "RIWhite$1,058.47395773",
    })
  ).toBeVisible();
});

test("test 5 loadcsv with error", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /protectedpath/to/protectedCSV.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("Error: protected file path: /")).toBeVisible();

  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/malformed.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(
    page.getByText("Error: the csv provided is malformed")
  ).toBeVisible();

  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/empty.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search xxx");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("Error: CSV is empty")).toBeVisible();

  await page.getByPlaceholder("Enter command here!").fill("search");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(
    page.getByText("Error: No query was provided for search")
  ).toBeVisible();

  await page.getByPlaceholder("Enter command here!").fill("loadcsv");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("Error: No file path was")).toBeVisible();
});
