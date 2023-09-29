/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import {
  cssModules,
  useCssModules,
} from "../dist/inline-css-modules-react.umd";

describe("cssModules and useCssModules", () => {
  test("default should not have styles", () => {
    render(<NoStyles />);
    const div = screen.getByText(text);
    expect(getComputedStyle(div).backgroundColor).toBeFalsy();
  });

  test("should display styles from applied class", () => {
    render(<WithStyles />);
    const div = screen.getByText(text);
    expect(getComputedStyle(div).backgroundColor).toBe("red");
  });

  test("style className should be the same as applied className", () => {
    render(<WithStyles />);
    const className = document.head
      .querySelector("style")
      .innerHTML.split("{")[0]
      .slice(1);
    expect(className).toBe(s.test);
  });

  test("should only mount one style element", () => {
    render(
      <>
        <WithStyles />
        <WithStyles />
      </>,
    );
    const styles = document.head.querySelectorAll("style");
    expect(styles.length).toBe(1);
  });

  test("should remove style after unmount", () => {
    const { unmount } = render(<WithStyles />);
    expect(document.head.querySelector("style")).toBeTruthy();
    unmount();
    expect(document.head.querySelector("style")).toBeFalsy();
  });
});

// setup
const text = "Hello, World!";

function NoStyles() {
  return <div>{text}</div>;
}

function WithStyles() {
  useCssModules(css);
  return <div className={s.test}>{text}</div>;
}

const { css, s } = cssModules`
  .test {
    background-color: red;
  }
`;
