import { useEffect } from 'react';

const separator = "||CSS_MODULES||";

const styleRef = {};

function useCssModules(cssModuleObject) {
  if (
    typeof cssModuleObject !== "object" ||
    !cssModuleObject.styles ||
    !cssModuleObject.id
  ) {
    throw new Error(
      `[useCssModules] requires an object with structure: { styles: string; id: string; }.
      Ensure babel plugin "babel-plugin-css-to-module" is properly installed and configured, and the template literal tag "cssModules" is set.
      Read more:
      https://github.com/geoctrl/babel-plugin-css-to-modules`
    );
  }

  const { styles, id } = cssModuleObject;
  useEffect(() => {
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

const cssModules = (strings, ...args) => {
  const evalString = strings
    .map((item, i) => {
      return `${item}${args[i] || ""}`;
    })
    .join("");

  const [id, classNameObject, styles] = evalString.split(separator);
  console.log("styles", styles);
  if (id && classNameObject && styles) {
    const classNames = JSON.parse(classNameObject);
    return { style: classNames, s: classNames, css: { styles, id } };
  }
  return evalString;
};

export { cssModules, useCssModules };
