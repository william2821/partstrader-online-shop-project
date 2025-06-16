import { devices, expect, PlaywrightTestConfig } from '@playwright/test';
import { matchers } from 'expect-playwright';

expect.extend(matchers);
const outputFolder = './output';

const config: PlaywrightTestConfig = {
  use: {
    // Browser options
    headless: false,
    ignoreHTTPSErrors: true,

    // Context options
    viewport: { width: 1080, height: 800 },

    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Look for tests files in the "tests" directory, relative to this configuration file
  testDir: './tests',

  timeout: 30000, //default maximum value

  retries: 0,

  // Limits the number of workers
  workers: 1,

  // Test result reporter
  reporter: [['html', { outputFolder: `${outputFolder}/html`, open: 'never' }]],

  // Directory for artifacts produced by tests
  outputDir: `${outputFolder}/artifacts`,

  fullyParallel: true,

  forbidOnly: false,
};
export default config;
