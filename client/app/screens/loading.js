import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";

function LoadingScreen({ navigation }) {
  return (
    <Screen>
      <ActivityIndicator visible={true} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LoadingScreen;
