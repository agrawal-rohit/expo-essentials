/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import SubHeading from "../../app/components/SubHeading";
import lightTheme from "../../app/config/lightTheme";
import darkTheme from "../../app/config/darkTheme";

describe("<SubHeading />", () => {
  it("works correctly in light theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...lightTheme }}>
          <SubHeading>Test SubHeading</SubHeading>
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("works correctly in dark theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...darkTheme }}>
          <SubHeading>Test SubHeading</SubHeading>
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
