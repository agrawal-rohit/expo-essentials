/* eslint-disable no-undef */
import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  cleanup,
} from "@testing-library/react-native";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Modal from "../../app/components/Modal";

jest.mock("react-native/Libraries/Modal/Modal", () => {
  const Modal = jest.requireActual("react-native/Libraries/Modal/Modal");
  // eslint-disable-next-line react/display-name
  return (props) => <Modal {...props} />;
});

describe("<Modal />", () => {
  afterEach(cleanup);

  it("does not render when set to inactive", () => {
    const { getByText } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Modal visible={false} modalTitle="Modal title"></Modal>
      </ApplicationProvider>
    );

    expect(() => getByText(/modal title/i)).toThrow(
      /unable to find an element/i
    );
  });

  it.skip("renders and closes correctly when activated", async () => {
    const mockClose = jest.fn();

    const { getByText, getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <Modal visible modalTitle="Modal title" onClose={mockClose}></Modal>
      </ApplicationProvider>
    );

    await waitFor(() => getByText(/modal title/i)); //modal is now visible

    fireEvent.press(getByTestId("close-button"));
    expect(mockClose).toBeCalled();
  });
});
