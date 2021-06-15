/* eslint-disable no-undef */
import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Button from "../../app/components/Button";

describe("<Button />", () => {
  afterEach(cleanup);

  it("renders the text correctly", () => {
    const { getAllByText } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Button>Button text</Button>
      </ApplicationProvider>
    );

    const button = getAllByText(/Button text/);
    expect(button[1].props.children).toEqual("Button text");
  });

  it("overrides default color with a custom one", () => {
    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Button color="#000000">Button text</Button>
      </ApplicationProvider>
    );

    const button = getByTestId("custom-color-button");
    expect(button.props.style.backgroundColor).toEqual("#000000");
  });

  it("shows spinner on loading", () => {
    const { getAllByText } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Button loading>Button text</Button>
      </ApplicationProvider>
    );

    expect(() => getAllByText(/Button text/)).toThrow(
      /unable to find an element/i
    );
  });
});
