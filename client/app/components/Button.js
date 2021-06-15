import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";
import SubHeading from "./SubHeading";

const styles = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function CustomButton({
  children,
  color = null,
  loading = false,
  style = {},
  ...props
}) {
  const LoadingIndicator = () => (
    <View style={styles.indicator}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const ButtonText = ({ children, loading }) => {
    if (loading) return null;
    return <SubHeading style={styles.buttonTextStyle}>{children}</SubHeading>;
  };

  // Custom color provided
  if (color) {
    return (
      <Button
        testID="custom-color-button"
        children={ButtonText({ children, loading })}
        accessoryLeft={loading ? LoadingIndicator : null}
        style={{ ...style, backgroundColor: color, borderColor: color }}
        {...props}
      />
    );
  }

  return (
    <Button
      testID="default-button"
      children={ButtonText({ children, loading })}
      accessoryLeft={loading ? LoadingIndicator : null}
      style={style}
      {...props}
    />
  );
}
