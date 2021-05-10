import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";

import Paragraph from "./Paragraph";

function TextLink({ color = colors.primary, onPress, style, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Paragraph weight="medium" color={color}>
        {children}
      </Paragraph>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TextLink;
