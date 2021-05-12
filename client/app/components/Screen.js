import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import colors from "../config/colors";

export default function Screen({ children, level = '1', withPadding = true }) {
  return (
    <Layout
      level={level}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={{ flex: 1, padding: withPadding ? 20 : 0 }}>
          {children}
        </View>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
