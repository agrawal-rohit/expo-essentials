import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import Paragraph from "./Paragraph";

export default function CustomTextInput({
  icon,
  errorMessage,
  errorVisible,
  withClearButton = false,
  width = "100%",
  value,
  onClear,
  style,
  ...otherProps
}) {
  return (
    <>
      <View style={[styles.container, { width: width }, style]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.placeholder}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={styles.textInput}
          value={value}
          placeholderTextColor={colors.placeholder}
          {...otherProps}
        />
        {value.length > 0 && withClearButton && (
          <TouchableOpacity onPress={onClear}>
            <MaterialIcons name="clear" size={20} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && errorVisible && (
        <Paragraph
          fontSize={14}
          color={colors.primary}
          style={{ marginBottom: 10 }}
        >
          {errorMessage}
        </Paragraph>
      )}
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
  },
  inputIcon: {
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    color: colors.dark,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
