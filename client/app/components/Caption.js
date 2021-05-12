import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export default function Heading({
  children,
  fontSize = 12,
  fontWeight = "400",
  style,
  ...props
}) {
  return (
    <Text
      category="c1"
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
