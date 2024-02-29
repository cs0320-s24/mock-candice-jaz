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
test("test 1", async ({ page }) => {
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

  //load another file
  await page
    .getByPlaceholder("Enter command here!")
    .fill("loadcsv /fakepath/to/starCSV.csv");
  await page.getByRole("button", { name: "Query!" }).click();
  await expect(page.getByText("CSV loaded successfully").nth(1)).toBeVisible();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Query!" }).click();

  //check if all history are present
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
  await expect(page.getByText("Error: No CSV loaded")).toBeVisible();
});
