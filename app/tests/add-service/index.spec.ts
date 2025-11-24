import { test, expect } from "@playwright/test";

test.describe("Testing add service flow", async () => {
	test("Should show validation properly", async ({ page }) => {
		await page.goto("/add-service");
		await page.getByLabel("service-name").fill("df");
		await page.locator("#submit").click();

		await expect(page.getByText("Minimum 3 characters required")).toBeVisible();
	});
	/*
    await page.getByLabel("service-highlights").fill("df")
        await page.locator("#add-highlight-button").click()
    */
});
