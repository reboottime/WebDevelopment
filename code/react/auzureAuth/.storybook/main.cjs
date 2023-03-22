const path = require("path");
const svgr = require("vite-plugin-svgr");
const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias = {
      "@/assets": path.resolve(__dirname, "../src/assets"),
      "@/components": path.resolve(__dirname, "../src/components"),
      "@/hooks": path.resolve(__dirname, "../src/hooks"),
      "@/mockData": path.resolve(__dirname, "../src/mockData"),
      "@/pages": path.resolve(__dirname, "../src/pages"),
      "@/sass": path.resolve(__dirname, "../src/sass"),
      "@/services": path.resolve(__dirname, "../src/services"),
      "@/utils": path.resolve(__dirname, "../src/utils"),
    };

    config.plugins = [svgr(), ...config.plugins];

    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@/sass/global.scss";`,
          },
        },
      },
    });
  },
};
