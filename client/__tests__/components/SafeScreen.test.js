/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import SafeScreen from "../../app/components/SafeScreen";
import lightTheme from "../../app/config/lightTheme";
import darkTheme from "../../app/config/darkTheme";

describe("<SafeScreen />", () => {
  it("works correctly in light theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...lightTheme }}>
          <SafeScreen>Test Paragraph</SafeScreen>
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("works correctly in dark theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...darkTheme }}>
          <SafeScreen>Test Paragraph</SafeScreen>
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
