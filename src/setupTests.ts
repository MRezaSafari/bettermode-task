import "@testing-library/jest-dom";

// Suppress React 18 warnings for testing
const originalError = console.error;
console.error = (...args) => {
  if (
    /ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /ReactDOMTestUtils.act is deprecated/.test(args[0]) ||
    /(WARN) Define/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};
