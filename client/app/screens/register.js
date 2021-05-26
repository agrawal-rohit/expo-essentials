import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, Image, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "../contexts/auth";
import jwt_decode from "jwt-decode";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Firebase from "../config/firebase";

// Components
import Page from "../components/Page";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";
import Caption from "../components/Caption";

import Toast from "react-native-root-toast";
import { useTheme, Divider } from "@ui-kitten/components";

import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import authStorage from "../utilities/authStorage";

const validationSchema = Yup.object({
  first_name: Yup.string().required().label("First name"),
  last_name: Yup.string().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  passwordConfirmation: Yup.string()
    .required("Password needs to be confirmed")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const theme = useTheme();

  const registerHandler = ({ first_name, last_name, email, password }) => {
    setLoading(true);

    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        Firebase.auth().onAuthStateChanged(async function (user) {
          if (user) {
            var token = await user.getIdToken();

            // Updates the user attributes:
            Firebase.firestore()
              .collection("users")
              .doc(user.uid)
              .set({
                email: email,
                firstName: first_name.trim(),
                lastName: last_name.trim(),
              })
              .then(
                function () {
                  // Profile updated successfully!
                  Toast.show("Registration Successful", {
                    duration: Toast.durations.SHORT,
                    backgroundColor: theme["notification-success"],
                  });

                  user
                    .sendEmailVerification()
                    .then(function () {
                      // Email sent.
                    })
                    .catch(function (error) {
                      // An error happened.
                    });

                  setLoading(false);

                  setTimeout(() => {
                    AsyncStorage.setItem("hasOnboarded", "true");
                    authContext.setUser(user);
                    authStorage.storeToken(token);

                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Home" }],
                    });
                  }, 300);
                },
                function (error) {
                  // An error happened.
                  Toast.show(error, {
                    duration: Toast.durations.SHORT,
                    backgroundColor: theme["notification-error"],
                  });
                }
              );
          }
        });
      })
      .catch((error) => {
        Toast.show(error, {
          duration: Toast.durations.SHORT,
          backgroundColor: theme["notification-error"],
        });
      });
  };

  const googleRegister = () => {
    
  }

  return (
    <>
      <Page>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Heading
              style={{
                marginBottom: 30,
                marginTop: 10,
                flex: 1,
              }}
            >
              Registration
            </Heading>
          </View>

          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            onSubmit={registerHandler}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1, marginRight: 10 }}>
                      <TextInput
                        placeholder="First Name"
                        autoCompleteType="name"
                        keyboardType="default"
                        returnKeyType="next"
                        textContentType="givenName"
                        autoCapitalize="none"
                        value={values.first_name}
                        onChangeText={handleChange("first_name")}
                        errorMessage={errors.first_name}
                        onBlur={() => setFieldTouched("first_name")}
                        errorVisible={touched.first_name}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        placeholder="Last Name"
                        autoCompleteType="name"
                        keyboardType="default"
                        returnKeyType="next"
                        textContentType="familyName"
                        autoCapitalize="none"
                        value={values.last_name}
                        onChangeText={handleChange("last_name")}
                        errorMessage={errors.last_name}
                        onBlur={() => setFieldTouched("last_name")}
                        errorVisible={touched.last_name}
                      />
                    </View>
                  </View>
                  <TextInput
                    placeholder="Email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    errorMessage={errors.email}
                    onBlur={() => setFieldTouched("email")}
                    errorVisible={touched.email}
                  />
                  <TextInput
                    placeholder="Password"
                    autoCompleteType="password"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    errorMessage={errors.password}
                    onBlur={() => setFieldTouched("password")}
                    errorVisible={touched.password}
                  />
                  <TextInput
                    placeholder="Confirm Password"
                    autoCompleteType="password"
                    keyboardType="default"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={values.passwordConfirmation}
                    onChangeText={handleChange("passwordConfirmation")}
                    errorMessage={errors.passwordConfirmation}
                    onBlur={() => setFieldTouched("passwordConfirmation")}
                    errorVisible={touched.passwordConfirmation}
                  />
                </ScrollView>

                <Button
                  loading={loading}
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Formik>

          {/* <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Divider
              style={{ flex: 1, marginRight: 10, alignSelf: "center" }}
            ></Divider>
            <Caption appearance="hint" style={{ alignSelf: "center" }}>
              or connect with
            </Caption>
            <Divider
              style={{ flex: 1, marginLeft: 10, alignSelf: "center" }}
            ></Divider>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Button color="#4285F4" style={{ flex: 1, marginRight: 10 }} onPress={googleRegister}>
              <AntDesign name="google" size={16} color="white" />
            </Button>
            <Button color="#3b5999" style={{ flex: 1 }}>
              <FontAwesome name="facebook" size={16} color="white" />
            </Button>
          </View> */}

          <View
            style={{ marginTop: 20, marginBottom: 10, flexDirection: "row" }}
          >
            <Paragraph style={{ marginRight: 10 }}>Have an account?</Paragraph>
            <TextLink onPress={() => navigation.navigate("Login")}>
              Login
            </TextLink>
          </View>
        </KeyboardAwareScrollView>
      </Page>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginTop: -15,
  },
});
