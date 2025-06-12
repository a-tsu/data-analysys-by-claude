import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
    },
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../src/assets'],
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    
    // Ensure proper module resolution
    config.resolve.modules = [
      'node_modules',
      '../node_modules'
    ];
    
    return config;
  },
};

export default config;