import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export default function Paragraph({
  children,
  fontSize = 17,
  fontFamily = "Jost-Regular",
  style,
  ...props
}) {
  return (
    <Text
      category="p1"
      style={{
        fontSize: fontSize,
        fontFamily: fontFamily,
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
