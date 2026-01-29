import { test, expect } from '@playwright/test'
import percySnapshot from '@percy/playwright'
import { argosScreenshot } from '@argos-ci/playwright'

test.describe('Percy + Playwright Demo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sample-webapp/')
  })

  test('should display the homepage with initial tasks', async ({ page }) => {
    // Verify header
    await expect(page.locator('h1')).toHaveText('Task Manager Pro')

    // Verify initial tasks are visible
    await expect(page.getByTestId('task-list')).toBeVisible()
    await expect(page.getByTestId('task-1')).toBeVisible()
    await expect(page.getByTestId('task-2')).toBeVisible()
    await expect(page.getByTestId('task-3')).toBeVisible()
    await expect(page.getByTestId('task-4')).toBeVisible()

    // Visual snapshots of initial state
    await percySnapshot(page, 'Homepage - Initial State')
    await argosScreenshot(page, 'Homepage - Initial State')
  })

  test('should add a new task', async ({ page }) => {
    const taskInput = page.getByTestId('task-input')
    const addButton = page.getByTestId('add-task-btn')

    // Add a new task
    await taskInput.fill('New E2E Test Task')
    await addButton.click()

    // Verify task was added
    await expect(page.locator('.task-card')).toHaveCount(5)
    await expect(page.locator('.task-title').last()).toHaveText('New E2E Test Task')

    // Visual snapshots after adding task
    await percySnapshot(page, 'Homepage - After Adding Task')
    await argosScreenshot(page, 'Homepage - After Adding Task')
  })

  test('should toggle task status', async ({ page }) => {
    const toggleButton = page.getByTestId('toggle-3')
    const task = page.getByTestId('task-3')

    // Initial status should be pending
    await expect(task.locator('.status-badge')).toHaveText('pending')

    // Toggle to in-progress
    await toggleButton.click()
    await expect(task.locator('.status-badge')).toHaveText('in-progress')

    // Visual snapshots with in-progress state
    await percySnapshot(page, 'Homepage - Task In Progress')
    await argosScreenshot(page, 'Homepage - Task In Progress')

    // Toggle to completed
    await toggleButton.click()
    await expect(task.locator('.status-badge')).toHaveText('completed')

    // Visual snapshots with completed state
    await percySnapshot(page, 'Homepage - Task Completed')
    await argosScreenshot(page, 'Homepage - Task Completed')
  })

  test('should delete a task', async ({ page }) => {
    // Verify initial count
    await expect(page.locator('.task-card')).toHaveCount(4)

    // Delete task 4
    await page.getByTestId('delete-4').click()

    // Verify task was deleted
    await expect(page.locator('.task-card')).toHaveCount(3)
    await expect(page.getByTestId('task-4')).not.toBeVisible()

    // Visual snapshots after deletion
    await percySnapshot(page, 'Homepage - After Deleting Task')
    await argosScreenshot(page, 'Homepage - After Deleting Task')
  })

  test('should update statistics correctly', async ({ page }) => {
    const stats = page.getByTestId('stats')

    // Verify initial stats (1 completed, 1 in-progress, 2 pending)
    await expect(stats.locator('.stat-card').nth(0).locator('.stat-number')).toHaveText('1')
    await expect(stats.locator('.stat-card').nth(1).locator('.stat-number')).toHaveText('1')
    await expect(stats.locator('.stat-card').nth(2).locator('.stat-number')).toHaveText('2')

    // Complete a pending task
    await page.getByTestId('toggle-3').click() // pending -> in-progress
    await page.getByTestId('toggle-3').click() // in-progress -> completed

    // Verify updated stats (2 completed, 1 in-progress, 1 pending)
    await expect(stats.locator('.stat-card').nth(0).locator('.stat-number')).toHaveText('2')
    await expect(stats.locator('.stat-card').nth(1).locator('.stat-number')).toHaveText('1')
    await expect(stats.locator('.stat-card').nth(2).locator('.stat-number')).toHaveText('1')

    // Visual snapshots with updated stats
    await percySnapshot(page, 'Homepage - Updated Statistics')
    await argosScreenshot(page, 'Homepage - Updated Statistics')
  })

  test('should handle keyboard input for adding tasks', async ({ page }) => {
    const taskInput = page.getByTestId('task-input')

    // Add task using Enter key
    await taskInput.fill('Task Added With Enter')
    await taskInput.press('Enter')

    // Verify task was added
    await expect(page.locator('.task-title').last()).toHaveText('Task Added With Enter')

    // Verify input was cleared
    await expect(taskInput).toHaveValue('')
  })
})
