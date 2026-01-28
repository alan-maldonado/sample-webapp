import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI
// const BASE_URL = 'https://alan-maldonado.github.io/sample-webapp/'
const BASE_URL = process.env.BASE_URL

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: BASE_URL || 'http://localhost:4173/sample-webapp/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: BASE_URL ? undefined : {
    command: 'npm run preview',
    url: 'http://localhost:4173/sample-webapp/',
    reuseExistingServer: !isCI,
  },
})
