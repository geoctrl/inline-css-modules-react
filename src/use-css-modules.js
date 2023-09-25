import { useLayoutEffect } from "react";
const separator = "||CSS_MODULES||";

const styleRef = {};

export function useCssModules(cssModuleObject) {
  if (
    typeof cssModuleObject !== "object" ||
    !cssModuleObject.hasOwnProperty("styles") ||
    !cssModuleObject.hasOwnProperty("id")
  ) {
    throw new Error(
      `4[useCssModules] requires an object with structure: { styles: string; id: string; }.
      Ensure babel plugin "babel-plugin-css-to-module" is properly installed and configured, and the template literal tag "cssModules" is set.
      Read more:
      https://github.com/geoctrl/babel-plugin-css-to-modules`
    );
  }

  if (!cssModuleObject.id || !cssModuleObject.styles) {
    return;
  }

  const { styles, id } = cssModuleObject;
  useLayoutEffect(() => {
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

export const cssModules = (strings, ...args) => {
  const evalString = strings
    .map((item, i) => {
      return `${item}${args[i] || ""}`;
    })
    .join("");

  const [id, classNameObject, styles] = evalString.split(separator);
  if (id && classNameObject && styles) {
    const classNames = JSON.parse(classNameObject);
    return { style: classNames, s: classNames, css: { styles, id } };
  }
  return { style: {}, s: {}, css: { styles: "", id: "" } };
};
