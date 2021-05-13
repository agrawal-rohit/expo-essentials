// 
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Icon, Input } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import Caption from "./Caption";

export default function CustomTextInput({
  icon,
  errorMessage,
  errorVisible,
  size="large",
  withClearButton = false,
  width = "100%",
  value,
  secure = false,
  onClear,
  style,
  ...otherProps
}) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(secure);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderSecureIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderErrorCaption = (errorMessage) => {
    return (
      <View style={styles.captionContainer}>
        {/* <Feather name="alert-circle" size={14} color="red" style={{marginRight: 5}} /> */}
        <Caption status="danger" style={{ marginTop: 8, marginBottom: 10 }}>
          {errorMessage}
        </Caption>
      </View>
    );
  };

  return (
    <>
      <Input
      size={size}
        value={value}
        accessoryRight={secure ? renderSecureIcon : null}
        status={errorMessage && errorVisible ? 'danger': 'basic'}
        secureTextEntry={secureTextEntry}
        textStyle={styles.textStyle}
        style={{marginBottom: 10}}
        {...otherProps}
      />
      {value.length > 0 && withClearButton && (
        <TouchableOpacity onPress={onClear}>
          <MaterialIcons name="clear" size={20} />
        </TouchableOpacity>
      )}
      {errorMessage && errorVisible && renderErrorCaption(errorMessage)}
    </>
  );
}

var styles = StyleSheet.create({
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10
  },
  textStyle: {
    fontSize: 17,
    fontFamily: 'Jost-Regular'
  }
});

