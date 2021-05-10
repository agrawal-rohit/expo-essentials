import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import Paragraph from "./Paragraph";

function ActivityIndicator({ visible = false, withText = false }) {
  const animation = useRef();

  useEffect(() => {
    if (visible) {
      animation.current.play();
    }
  });

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        ref={animation}
        loop
        style={styles.container}
        source={require("../assets/animations/loader.json")}
      />
    </View>
    // <View style={styles.container}>
    //   {/* <Image
    //     resizeMode="contain"
    //     style={styles.image}
    //     source={require("../assets/animations/book-stack-loader.gif")}
    //   /> */}
    //   <LottieView
    //     ref={animation}
    //     loop
    //     style={styles.container}
    //     source={require("../assets/animations/loader.json")}
    //   />
    //   {withText && <Paragraph style={styles.text}>Loading</Paragraph>}
    // </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    opacity: 0.8,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: -30,
  },
});

export default ActivityIndicator;
