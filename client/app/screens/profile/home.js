import React, { useContext } from "react";
import Toast from "react-native-root-toast";
import { useTheme } from "@ui-kitten/components";
import Page from "../../components/Page";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

import AuthContext from "../../contexts/auth";
import authStorage from "../../utilities/authStorage";
import Firebase from "../../config/firebase";

function ProfileHome() {
  const authContext = useContext(AuthContext);
  const theme = useTheme();

  const handleLogOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        Toast.show("Logout Successful", {
          duration: Toast.durations.SHORT,
          backgroundColor: theme["notification-success"],
        });

        // Sign-out successful.
        authContext.setUser(null);
        authStorage.removeToken();
      })
      .catch((error) => {
        Toast.show(error, {
          duration: Toast.durations.SHORT,
          backgroundColor: theme["notification-error"],
        });
        // An error happened.
      });
  };

  return (
    <Page>
      <Heading>Profile</Heading>
      <Button status="danger" onPress={handleLogOut}>
        Log Out
      </Button>
    </Page>
  );
}

export default ProfileHome;
