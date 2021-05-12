import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";

export default function CustomButton({ children, loading = false, ...props }) {
  const LoadingIndicator = (props) => (
    <View style={styles.indicator}>
      <Spinner status="basic" size='small'/>
    </View>
  );

  return <Button accessoryLeft={loading ? LoadingIndicator : null} {...props}>
      {loading ? null : children}
    </Button>;
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
