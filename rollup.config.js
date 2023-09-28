import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

// export default {
//   input: "src/use-css-modules",
//   output: {
//     file: "public/bundle.js",
//     format: "es",
//   },
// };
//

export default {
  input: "src/inline-css-modules-react.ts",
  output: [
    {
      file: "dist/inline-css-modules-react.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/inline-css-modules-react.esm.min.js",
      format: "esm",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "dist/inline-css-modules-react.umd.js",
      format: "umd",
      name: "inline-css-modules-react",
      sourcemap: true,
    },
    {
      file: "dist/inline-css-modules-react.umd.min.js",
      format: "umd",
      name: "inline-css-modules-react",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  external: ["react"],
  plugins: [
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};
