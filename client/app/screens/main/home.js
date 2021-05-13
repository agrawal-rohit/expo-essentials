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

import Page from "../../components/Page";
import Heading from "../../components/Heading";
function ShelfHome({ navigation }) {
  return (
    <Page>
        <Heading>Home</Heading>
    </Page>
  );
}

export default ShelfHome;
