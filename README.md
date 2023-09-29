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
here: [babel-plugin-css-to-module](https://github.com/geoctrl/babel-plugin-css-to-module)

## Usage

```typescript jsx
import { cssModules, useCssModules } from "inline-css-modules-react";

function MyComponent() {
  useCssModules(css);
  return (
    <div className={s.test}>Hello, World!</div>
  );
}

// the 
const { s, css } = cssModules`
  .test {
    background-color: red;
  }
`;
```

## API

## `cssModules`

`cssModules(TemplateStringsArray, ...args: unknown[])`

Returns:

```
{
  s: Record<string, string>;
  style: Record<string, string>; // alias of s
  styles: Record<string, string>; // alias of s
  css: { styles: string, id: string }
}
```

This is where the babel plugin `babel-plugin-css-to-module` comes in. By
default, the plugin will target all tagged template literals
named `cssModules`, will transform your css during the build process, and
returns a new string.

```typescript jsx
const { s, css } = cssModules`
  .test {
    background-color: red;
  }
`;
```

**If the babel plugin _is_ installed**: the returned object from this function
will
be properly populated.

**if the babel plugin _is not_ installed**: the returned object will contain
empty
properties (and we'll shout at you with a console error 😉).

The `s` property is a collection of all your defined css class names:

```jsx
<div {s.test}>Hello, World!</div>
```

We also offer some aliases for those that prefer some flexibility: `s`, `style`,
or `styles`.

The `css` property should be passed to your `useCssModules` hook.

## `useCssModules`

`useCssModules({ styles: string; id: string })`

Returns: `void`

```jsx
useCssModules(css);
```

`useCssModules` will automatically mount/unmount your newly transformed css
inside your `<head>`. If your component is already mounted, and you render
another one, the hook will not duplicate your css - it only gets added to the
head once.

## Syntax highlighting & intellisense

There are currently no IDE plugins to handle this right now - your template
literals will be just plain strings 😞... however intellij (or webstorm) offers
language injection and can easily be setup to give you full syntax highlighting
& intellisense. 

1. Go to intellij's `Settings`, and choose `Editor` > `Language Injections` 
2. Press the `+` button and choose `JS Tagged Literal Injection`
3. Name your new injection setting to something memorable, like `cssModules`
4. Set your "Language ID" to `CSS` (or `SASS` if you're using that)
5. Set "Places Patterns" to `+ taggedString("cssModules")`
6. Leave all other options empty and click "OK"
7. Enjoy css-in-js like a boss

## MIT License

Copyright (c) 2023 Tony Lefler

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
