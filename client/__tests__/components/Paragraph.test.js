/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import Paragraph from "../../app/components/Paragraph";
import lightTheme from "../../app/config/lightTheme";
import darkTheme from "../../app/config/darkTheme";

describe("<Paragraph />", () => {
  it("works correctly in light theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...lightTheme }}>
          <Paragraph>Test Paragraph</Paragraph>
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("works correctly in dark theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...darkTheme }}>
          <Paragraph>Test Paragraph</Paragraph>
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
