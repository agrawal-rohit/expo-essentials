import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Screen from "../../components/Screen";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

function DiscoverHome({ navigation }) {
  return (
    <Screen>
      <Button onPress={() => navigation.push("SearchScreen")}>
        Go to Search
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DiscoverHome;
