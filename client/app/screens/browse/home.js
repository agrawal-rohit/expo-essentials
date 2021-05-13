import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Page from "../../components/Page";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

function DiscoverHome({ navigation }) {
  return (
    <Page>
      <Heading>Browse</Heading>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DiscoverHome;
