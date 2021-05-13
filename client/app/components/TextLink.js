import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Paragraph from "./Paragraph";

function TextLink({ onPress, style, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Paragraph status='primary' fontFamily="Jost-Medium">{children}</Paragraph>
    </TouchableOpacity>
  );
}

export default TextLink;
