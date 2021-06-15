import React from "react";
import { Text } from "@ui-kitten/components";

export default function Heading({
  children,
  fontSize = 28,
  style = {},
  ...props
}) {
  return (
    <Text
      category="h1"
      style={{
        fontSize,
        fontFamily: "Jost-Bold",
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
