module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@api$": "<rootDir>/src/utils/burger-api.ts",
    "^@utils-types$": "<rootDir>/src/utils/types.ts"
  }
};
