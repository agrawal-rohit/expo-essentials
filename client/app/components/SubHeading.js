import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";

export default function SubHeading({
  children,
  fontSize = 16,
  color = colors.black,
  style,
  ...props
}) {
  var styles = StyleSheet.create({
    paragraphStyle: {
      fontSize: fontSize,
      fontFamily: "Poppins-Bold",
      color: color,
    },
  });

  return (
    <Text {...props} style={[styles.paragraphStyle, style]}>
      {children}
    </Text>
  );
}
