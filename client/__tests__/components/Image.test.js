/* eslint-disable no-undef */
import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import renderer from "react-test-renderer";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Image from "../../app/components/Image";

describe("<Image />", () => {
  afterEach(cleanup);

  it("renders local image correctly", () => {
    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Image source={require("../../app/assets/images/icon.png")} />
      </ApplicationProvider>
    );

    expect(() => getByTestId("local-image")).not.toThrow(
      /unable to find an element/i
    );
  });

  it("renders URI image correctly", () => {
    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Image imageUri="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/main_puppies_1280p.jpg?itok=ZZ1podQK" />
      </ApplicationProvider>
    );

    expect(() => getByTestId("uri-image")).not.toThrow(
      /unable to find an element/i
    );
  });

  it("renders and caches URI image correctly", () => {
    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Image
          imageUri="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/main_puppies_1280p.jpg?itok=ZZ1podQK"
          cache={true}
        />
      </ApplicationProvider>
    );

    expect(() => getByTestId("cached-image")).not.toThrow(
      /unable to find an element/i
    );
  });

  it("renders with sharp corners correctly", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={eva.light}>
          <Image
            imageUri="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/main_puppies_1280p.jpg?itok=ZZ1podQK"
            rounded={false}
          />
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with round corners correctly", () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={eva.light}>
          <Image imageUri="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/main_puppies_1280p.jpg?itok=ZZ1podQK" />
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
