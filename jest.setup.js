Object.defineProperty(global, "import.meta", {
  value: {
    env: {
      SSR: false,
    },
  },
});
