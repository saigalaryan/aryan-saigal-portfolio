// eslint-config-next 16 ships native flat config, so it is imported directly.
// FlatCompat is not used here: wrapping this config throws on a circular
// reference in its plugin graph.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Vendored shadcn/ui primitives; not worth linting as our own source.
      "components/ui/**",
    ],
  },
  {
    rules: {
      // Surface unused bindings, with the conventional underscore opt-out.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
