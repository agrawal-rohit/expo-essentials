import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";
import SubHeading from "./SubHeading";

export default function CustomButton({
  children,
  color = null,
  loading = false,
  style = {},
  ...props
}) {
  const LoadingIndicator = (props) => (
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
        children={ButtonText({ children, loading })}
        accessoryLeft={loading ? LoadingIndicator : null}
        style={{ ...style, backgroundColor: color, borderColor: color }}
        {...props}
      ></Button>
    );
  } else {
    return (
      <Button
        children={ButtonText({ children, loading })}
        accessoryLeft={loading ? LoadingIndicator : null}
        style={style}
        {...props}
      ></Button>
    );
  }
}

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
