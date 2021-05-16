import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Paragraph from "./Paragraph";
import { useNetInfo } from "@react-native-community/netinfo";

import { useTheme } from "@ui-kitten/components";

export default function OfflineNotice() {
  const theme = useTheme();
  const netInfo = useNetInfo();

  if (netInfo.type !== "unkown" && netInfo.isInternetReachable === false) {
    var styles = StyleSheet.create({
      container: {
        backgroundColor: theme["notification-error"],
        height: 50,
        top: Constants.statusBarHeight,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        zIndex: 2,
      },
      text: {
        color: "white",
      },
    });

    return (
      <View style={styles.container}>
        <Paragraph style={styles.text}>No Internet Connection!</Paragraph>
      </View>
    );
  }

  return null;
}
