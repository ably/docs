const extendConfig = require("@ably/ui/tailwind.extend.js");

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      ...ablyUIConfig.purge.content,
    ],
    options: {
      ...ablyUIConfig.purge.options,
    },
  },
}));
