module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests-config/setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
