# `inline-css-modules-react`

[![npm version](https://badge.fury.io/js/inline-css-modules-react.svg)](https://badge.fury.io/js/inline-css-modules-react)

Write css-in-js using template literals, css modules, and React.

## Install

This library uses [react](https://www.npmjs.com/package/react), and requires it
as a peer dependency.

```shell
yarn add react inline-css-modules-react
# or
npm install react inline-css-modules-react
```

This library also requires your css template literals to be converted to css
modules using
the `babel-plugin-css-to-module`:

```shell
yarn add -D postcss babel-plugin-css-to-module
# or
npm install -D postcss babel-plugin-css-to-module
```

Follow the installation instructions to
here: [babel-plugin-css-to-module](https://github.com/geoctrl/inline-css-modules-react)

## Usage

```typescript jsx
import { cssModules, useCssModules } from "inline-css-modules-react";

function MyComponent() {
  useCssModules(css);
  return (
    <div className={s.test}>Hello, World!</div>
  );
}

const { styles, css } = cssModules`
  .test {
    background-color: red;
  }
`;
```

Let's break down the example above, starting from the bottom:

```typescript jsx
const { css, s } = cssModules``
```
