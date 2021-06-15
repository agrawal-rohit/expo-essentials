import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { Layout } from "@ui-kitten/components";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default function SafeScreen({ children, level = "1" }) {
  return (
    <Layout
      level={level}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.safeAreaContainer}>{children}</SafeAreaView>
    </Layout>
  );
}
