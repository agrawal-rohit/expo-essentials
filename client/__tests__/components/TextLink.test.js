/* eslint-disable no-undef */
import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react-native";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import TextLink from "../../app/components/TextLink";

describe("<TextLink />", () => {
  afterEach(cleanup);

  it("renders the text correctly", () => {
    const mockFn = jest.fn();

    const { getByText, getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <TextLink onPress={mockFn}>Link text</TextLink>
      </ApplicationProvider>
    );

    const text = getByText(/link text/i);
    const clickable = getByTestId("clickable");
    expect(text.props.children).toEqual("Link text");
    fireEvent.press(clickable);

    expect(mockFn).toBeCalled();
  });
});
