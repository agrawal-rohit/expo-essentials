import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Screen from "../../components/Screen";
import Heading from "../../components/Heading";
function ShelfHome({ navigation }) {
  return (
    <Screen paddingBottom={0}>
        <Heading>Home</Heading>
    </Screen>
  );
}

export default ShelfHome;
