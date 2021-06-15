/* eslint-disable no-undef */
import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import OfflineNotice from "../../app/components/OfflineNotice";
import { useNetInfo } from "@react-native-community/netinfo";

describe("<OfflineNotice />", () => {
  afterEach(cleanup);

  it("is hidden when internet is available", () => {
    useNetInfo.mockResolvedValueOnce({
      type: "test",
      isInternetReachable: true,
    });
    const { getByText } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <OfflineNotice />
      </ApplicationProvider>
    );
    expect(() => getByText(/no internet connection/i)).toThrow(
      /unable to find an element/i
    );
  });
});
