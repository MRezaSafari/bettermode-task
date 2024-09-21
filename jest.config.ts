import { pathsToModuleNameMapper } from "ts-jest";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { compilerOptions } = require("./tsconfig.jest.json");

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // if you have setupTests.ts
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.graphql$": "<rootDir>/graphqlTransformer.ts",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "graphql", "node"],
  transformIgnorePatterns: [],
  setupFiles: ["<rootDir>/jest.setup.js"],
};
