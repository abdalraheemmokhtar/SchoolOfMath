import { expect, test } from "@playwright/test";

test("primary demo learner journey", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /learn mathematics with/i })).toBeVisible();
  await page.getByRole("link", { name: /start learning/i }).first().click();
  await expect(page.getByRole("heading", { name: /tell us how you learn/i })).toBeVisible();
  await page.getByRole("button", { name: /use this learning path/i }).click();
  await expect(page.getByRole("heading", { name: /good evening/i })).toBeVisible();

  const menuButton = page.getByRole("button", { name: /open navigation/i });
  if (await menuButton.isVisible()) await menuButton.click();
  await page.getByRole("link", { name: /courses/i }).first().click();
  await page.getByRole("link", { name: /algebra foundations/i }).first().click();
  await page.getByRole("link", { name: /continue course/i }).click();
  await expect(page.getByRole("heading", { name: "Solving One-Step Equations" }).first()).toBeVisible();

  const firstAnswer = page.getByLabel("Your answer").first();
  await firstAnswer.fill("7");
  await page.getByRole("button", { name: /check answer/i }).first().click();
  await expect(page.getByText(/that reasoning works/i).first()).toBeVisible();

  await page.getByRole("button", { name: /give me a hint/i }).nth(1).click();
  await expect(page.getByText(/undo/i).first()).toBeVisible();

  await page.getByPlaceholder(/ask about this lesson/i).fill("Why do both sides need the same operation?");
  await page.getByRole("button", { name: /send to soma/i }).click();
  await expect(page.getByText(/balanced|both sides/i).last()).toBeVisible();
});
