const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4,
  reporter: 'html',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: process.env.BASE_URL || 'https://test-spectre.pantheonsite.io/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [
    // Setup projects - run first to authenticate
    {
      name: 'admin-setup',
      testMatch: /admin\.setup\.js/,
      testDir: './auth',
    },
    {
      name: 'student-setup',
      testMatch: /student\.setup\.js/,
      testDir: './auth',
    },

    // Admin tests - depend on admin-setup
    {
      name: 'admin-tests',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        storageState: 'auth/.auth/admin.json',
      },
      dependencies: ['admin-setup'],
      testMatch: /specs\/admin\/.*.spec.js/,
      testDir: '.',
    },

    // Student tests - depend on student-setup
    {
      name: 'student-tests',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        storageState: 'auth/.auth/student.json',
      },
      dependencies: ['student-setup'],
      testMatch: /specs\/student\/.*.spec.js/,
      testDir: '.',
    },

    // Nightly tests - require both auth states (run admin tests with admin auth, etc.)
    {
      name: 'nightly-admin',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        storageState: 'auth/.auth/admin.json',
      },
      dependencies: ['admin-setup'],
      testMatch: /specs\/nightly\/admin-.*.spec.js/,
      testDir: '.',
    },
    {
      name: 'nightly-student',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        storageState: 'auth/.auth/student.json',
      },
      dependencies: ['student-setup'],
      testMatch: /specs\/nightly\/student-.*.spec.js/,
      testDir: '.',
    },
  ],
});
