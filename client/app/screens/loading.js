import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

import Page from "../components/Page";
import ActivityIndicator from "../components/ActivityIndicator";

function LoadingScreen({ navigation }) {
  return (
    <Page withPadding={false}>
      <ActivityIndicator visible={true} />
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LoadingScreen;
