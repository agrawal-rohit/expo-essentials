import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export default function Paragraph({
  children,
  fontSize = 16,
  fontWeight = "400",
  style,
  ...props
}) {
  return (
    <Text
      category="p1"
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: "Poppins-Regular",
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
