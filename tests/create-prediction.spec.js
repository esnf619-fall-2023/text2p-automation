import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://text2p.bibalan.com/admin/auth/login');
    await page.getByPlaceholder('e.g. kai@doe.com').click();
    await page.getByPlaceholder('e.g. kai@doe.com').fill('demo@ucalgary.ca');
    await page.getByPlaceholder('e.g. kai@doe.com').press('Tab');
    await page.getByLabel('Password*').fill('Demo@123');
    await page.getByRole('button', { name: 'Login' }).click();  
});

test('should return a validation error when creating a new prediction with a short text', async ({ page }) => {
    await page.getByRole('link', { name: 'Content Manager' }).click();
    await page.getByRole('link', { name: 'Create new entry' }).click();
    await page.getByPlaceholder('Please write something to').click();
    await page.getByPlaceholder('Please write something to').fill('This is a new test.');
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Save' }).click();
    
    await page.waitForTimeout(2000);

    const error = await page.$('p[id="text-error"]');
    expect(error).toBeTruthy();
})

test('should fill the MBTI field when creating a new prediction', async ({ page }) => {
  await page.getByRole('link', { name: 'Content Manager' }).click();
  await page.getByRole('link', { name: 'Create new entry' }).click();
  await page.getByPlaceholder('Please write something to').click();
  await page.getByPlaceholder('Please write something to').fill('This is a new test. Write something to get a personality prediction.');
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.waitForTimeout(2000);

  const mbtiInput = await page.$('input[name="mbti"]');
  const isDisabled = await mbtiInput.isDisabled();
  const inputValue = await mbtiInput.inputValue();

  expect(isDisabled).toBe(true);
  expect(inputValue.length).toBe(4);
});