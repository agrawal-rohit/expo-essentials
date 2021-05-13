import React from "react";
import { Text } from "@ui-kitten/components";

export default function Heading({
  children,
  fontSize = 12,
  fontWeight = "800",
  style,
  ...props
}) {
  return (
    <Text
      category="label"
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: "Jost-Bold",
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
