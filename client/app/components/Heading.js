import React from "react";
import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";

export default function HeadingOne({
  children,
  color = colors.darkColor,
  fontSize = 28,
  style,
}) {
  const styles = StyleSheet.create({
    titleStyles: {
      fontSize: fontSize,
      color: color,
      fontFamily: "Poppins-ExtraBold",
    },
  });

  return <Text style={[styles.titleStyles, style]}>{children}</Text>;
}
