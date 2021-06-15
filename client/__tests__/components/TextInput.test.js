/* eslint-disable no-undef */
import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import TextInput from "../../app/components/TextInput";

jest.mock("react-native/Libraries/Modal/Modal", () => {
  const Modal = jest.requireActual("react-native/Libraries/Modal/Modal");
  // eslint-disable-next-line react/display-name
  return (props) => <Modal {...props} />;
});

describe("<TextInput />", () => {
  afterEach(cleanup);

  it("reflects changes in value correctly", () => {
    const value = "start value";
    const mockChangeText = jest.fn();

    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <TextInput
          placeholder="Enter value"
          onChangeText={mockChangeText}
          value={value}
        />
      </ApplicationProvider>
    );

    const input = getByTestId("text-input");
    fireEvent.changeText(input, "new value");

    expect(mockChangeText).toBeCalledWith("new value");
  });

  it("shows errors correctly", () => {
    const value = "start value";

    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <TextInput
          placeholder="Enter value"
          value={value}
          errorVisible
          errorMessage="Test error message"
        />
      </ApplicationProvider>
    );

    const errorMessage = getByTestId("error-message");
    expect(errorMessage.props.children).toEqual("Test error message");
  });

  it("clear text gets called", () => {
    const value = "start value";
    const mockOnClear = jest.fn();

    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <TextInput
          placeholder="Enter value"
          value={value}
          onClear={mockOnClear}
          withClearButton
        />
      </ApplicationProvider>
    );

    const clearIcon = getByTestId("clear-icon");
    fireEvent.press(clearIcon);

    expect(mockOnClear).toBeCalled();
  });

  it("hides and shows secure data correctly", () => {
    const value = "start value";

    const { getByTestId } = render(
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <TextInput placeholder="Enter value" value={value} secure />
      </ApplicationProvider>
    );

    const input = getByTestId("text-input");
    expect(input.props.secureTextEntry).toBeTruthy();

    const secureIcon = getByTestId("secure-icon");
    fireEvent.press(secureIcon);

    expect(input.props.secureTextEntry).toBeFalsy();
  });
});
