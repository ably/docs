module.exports = {
  transform: {
    '^.+\\.(j|t)sx?$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['src/styles/svg'],
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  // NOTE: This is a workaround for compilation issues with .d.ts files
  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|use-keyboard-shortcut|react-medium-image-zoom)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  coverageReporters: ['text'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
};
