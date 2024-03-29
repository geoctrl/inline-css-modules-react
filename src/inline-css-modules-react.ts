import { useLayoutEffect } from "react";

type CssModuleObj = Record<string, string>;
type CssUsage = { styles: string; id: string };

type CssModuleBuilt = {
  style: CssModuleObj;
  styles: CssModuleObj;
  s: CssModuleObj;
  css: CssUsage;
};

const separator = "||CSS_MODULES||";
const styleRef = {};

export function useCssModules(cssModuleObject: CssUsage): void {
  if (
    typeof cssModuleObject !== "object" ||
    !cssModuleObject.hasOwnProperty("styles") ||
    !cssModuleObject.hasOwnProperty("id")
  ) {
    throw new Error(
      `[useCssModules] requires an object with structure: { styles: string; id: string; }.
      Ensure babel plugin "babel-plugin-css-to-module" is properly installed and configured, and the template literal tag "cssModules" is set.
      Read more:
      https://github.com/geoctrl/babel-plugin-css-to-modules`,
    );
  }

  const { styles, id } = cssModuleObject;
  useLayoutEffect(() => {
    if (!cssModuleObject.id || !cssModuleObject.styles) {
      return;
    }
    if (styleRef[id]) {
      styleRef[id].instances += 1;
    } else {
      const styleElement = document.createElement("style");
      styleElement.setAttribute("type", "text/css");
      styleElement.textContent = styles;
      styleRef[id] = { instances: 1, element: styleElement };
      document.head.appendChild(styleElement);
    }

    return () => {
      if (styleRef[id].instances === 1) {
        styleRef[id].element.remove();
        delete styleRef[id];
      } else {
        styleRef[id].instances -= 1;
      }
    };
  }, [cssModuleObject.styles]);
}

export const cssModules = (
  strings: TemplateStringsArray,
  ...args: unknown[]
): CssModuleBuilt => {
  const evalString = strings
    .map((item, i) => {
      return `${item}${args[i] || ""}`;
    })
    .join("");

  const [id, classNameObject, styles] = evalString.split(separator);
  if (id && classNameObject && styles) {
    const classNames = JSON.parse(classNameObject);
    return {
      style: classNames,
      s: classNames,
      styles: classNames,
      css: { styles, id },
    };
  }
  console.error(
    `[inline-css-modules-react] package requires the "babel-plugin-css-to-module" to be installed.
learn more at: https://github.com/geoctrl/babel-plugin-css-to-module`,
  );
  return {
    style: {},
    s: {},
    styles: {},
    css: { styles: "", id: "" },
  };
};
