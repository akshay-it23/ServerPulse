export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    }
  }
];
