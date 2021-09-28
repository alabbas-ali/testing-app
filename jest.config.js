module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    // jest-dom adds custom jest matchers for asserting on DOM nodes.
    // allows you to do things like:
    // expect(element).toHaveTextContent(/react/i)
    // learn more: https://github.com/testing-library/jest-dom
    "@testing-library/jest-dom/extend-expect"
  ],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",


  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  testEnvironment: 'jsdom',

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
