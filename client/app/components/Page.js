import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Layout } from "@ui-kitten/components";

export default function Page({ children, withPadding = true }) {
  return (
    <Layout
      style={{
        flex: 1,
        padding: withPadding ? 20 : 0
      }}
    >
          {children}
    </Layout>
  );
}

const styles = StyleSheet.create({

});
