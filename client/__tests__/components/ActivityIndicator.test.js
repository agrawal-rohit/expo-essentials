/* eslint-disable no-undef */

jest.useFakeTimers();

import React from "react";
import renderer from "react-test-renderer";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import ActivityIndicator from "../../app/components/ActivityIndicator";
import lightTheme from "../../app/config/lightTheme";
import darkTheme from "../../app/config/darkTheme";

describe("<ActivityIndicator />", () => {
  it("doesn't render when not loading", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={eva.light}>
          <ActivityIndicator visible={false} />
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree.children).toBe(null);
  });

  it("renders when loading", () => {
    let comp;
    renderer.act(() => {
      comp = renderer.create(
        <ApplicationProvider {...eva} theme={eva.light}>
          <ActivityIndicator visible />
        </ApplicationProvider>
      );
    });
    const tree = comp.toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("works correctly in light theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...lightTheme }}>
          <ActivityIndicator />
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("works correctly in dark theme", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...darkTheme }}>
          <ActivityIndicator />
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
