import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import colors from "../config/colors";

export default function Button({
  children,
  buttonType = "fill",
  color = colors.primary,
  style,
  disabled = false,
  onPress,
}) {
  if (buttonType == "fill") {
    return (
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          style,
          { backgroundColor: color, opacity: disabled ? 0.4 : 1 },
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={[styles.buttonTextStyle, { color: colors.white }]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  } else if (buttonType == "outline") {
    return (
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          style,
          {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: color,
          },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonTextStyle, { color: color }]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    marginBottom: 0,
    alignSelf: "center",
  },
  buttonTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
