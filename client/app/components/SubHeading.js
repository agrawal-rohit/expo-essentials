import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export default function SubHeading({
  children,
  fontSize = 17,
  style,
  ...props
}) {
  return (
    <Text
      category="s1"
      style={{
        fontSize: fontSize,
        fontFamily: "Jost-SemiBold",
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
