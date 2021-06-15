import React, { useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";
import { useTheme } from "@ui-kitten/components";
import AuthContext from "../contexts/auth";

import Firebase from "../config/firebase";

// Components
import Page from "../components/Page";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";

import authStorage from "../utilities/authStorage";

const validationSchema = Yup.object({
  firstName: Yup.string().required().label("First name"),
  lastName: Yup.string().label("Last Name"),
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

  const registerHandler = ({ firstName, lastName, email, password }) => {
    setLoading(true);

    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdToken();

            // Updates the user attributes:
            Firebase.firestore()
              .collection("users")
              .doc(user.uid)
              .set({
                email,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
              })
              .then(
                () => {
                  // Profile updated successfully!
                  Toast.show("Registration Successful", {
                    duration: Toast.durations.SHORT,
                    backgroundColor: theme["notification-success"],
                  });

                  user
                    .sendEmailVerification()
                    .then(() => {
                      // Email sent.
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
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
                (error) => {
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

  // const googleRegister = () => {

  // };

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
              firstName: "",
              lastName: "",
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
                        value={values.firstName}
                        onChangeText={handleChange("firstName")}
                        errorMessage={errors.firstName}
                        onBlur={() => setFieldTouched("firstName")}
                        errorVisible={touched.firstName}
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
                        value={values.lastName}
                        onChangeText={handleChange("lastName")}
                        errorMessage={errors.lastName}
                        onBlur={() => setFieldTouched("lastName")}
                        errorVisible={touched.lastName}
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
                    secureTextEntry
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
                    secureTextEntry
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
