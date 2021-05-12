import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";

function ActivityIndicator({ visible = false, ...props }) {

  if(!visible) return null

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Spinner size="large" {...props} />
      </View>
    </View>
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
});

export default ActivityIndicator;
