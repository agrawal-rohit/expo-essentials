import React, { useState, useContext } from "react";
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
import SubHeading from "../../components/SubHeading";

import AuthContext from "../../contexts/auth";
import authStorage from "../../auth/storage";

function ProfileHome({ navigation }) {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    authContext.setUser(null);
    authStorage.removeToken();
  };

  return (
    <Page>
      <Heading>Profile</Heading>
      <Button onPress={handleLogOut}>Log Out</Button>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProfileHome;
