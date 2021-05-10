import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";

export default function Paragraph({
  children,
  fontSize = 16,
  color = colors.black,
  weight = "regular",
  style,
  ...props
}) {
  var styles = StyleSheet.create({
    paragraphStyle: {
      fontSize: fontSize,
      fontFamily: weight == "medium" ? "Poppins-Medium" : "Poppins-Regular",
      lineHeight: 20,
      color: color,
    },
  });

  return (
    <Text {...props} style={[styles.paragraphStyle, style]}>
      {children}
    </Text>
  );
}
