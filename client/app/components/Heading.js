import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export default function Heading({
  children,
  fontSize = 24,
  fontWeight = "800",
  style,
  ...props
}) {
  return (
    <Text
      category="h1"
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: "Poppins-Bold",
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
