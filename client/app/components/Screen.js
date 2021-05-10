import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";

import colors from "../config/colors";

export default function Screen({
  children,
  withPadding = true,
  paddingAmount = 20,
  paddingBottom = 20,
}) {
  if (withPadding) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View
          style={{
            padding: paddingAmount,
            flex: 1,
            paddingBottom: paddingBottom,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.screenContainer}>{children}</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
