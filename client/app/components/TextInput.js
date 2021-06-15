//
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Icon, Input } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";

import Caption from "./Caption";

const styles = StyleSheet.create({
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  textStyle: {
    fontSize: 17,
    fontFamily: "Jost-Regular",
  },
});

export default function CustomTextInput({
  errorMessage,
  errorVisible,
  size = "large",
  withClearButton = false,
  onChangeText,
  value,
  secure = false,
  onClear,
  ...otherProps
}) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(secure);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderSecureIcon = (props) => (
    <TouchableWithoutFeedback testID="secure-icon" onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderErrorCaption = (errorMessage) => (
    <View style={styles.captionContainer}>
      <Caption
        status="danger"
        testID="error-message"
        style={{ marginTop: 8, marginBottom: 10 }}
      >
        {errorMessage}
      </Caption>
    </View>
  );

  return (
    <>
      <Input
        testID="text-input"
        size={size}
        value={value}
        onChangeText={onChangeText}
        accessoryRight={secure ? renderSecureIcon : null}
        status={errorMessage && errorVisible ? "danger" : "basic"}
        secureTextEntry={secureTextEntry}
        textStyle={styles.textStyle}
        style={{ marginBottom: 10 }}
        {...otherProps}
      />
      {value.length > 0 && withClearButton && (
        <TouchableOpacity testID="clear-icon" onPress={onClear}>
          <MaterialIcons name="clear" size={20} />
        </TouchableOpacity>
      )}
      {errorMessage && errorVisible && renderErrorCaption(errorMessage)}
    </>
  );
}
