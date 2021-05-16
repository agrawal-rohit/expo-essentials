import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "../contexts/auth";
import jwt_decode from "jwt-decode";

import Toast from "react-native-root-toast";
import { useTheme } from "@ui-kitten/components";

// Components
import Page from "../components/Page";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";
import Label from "../components/Label";

// API
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import authStorage from "../utilities/authStorage";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const loginApi = useApi(authApi.login);

  const authContext = useContext(AuthContext);
  const theme = useTheme();

  const loginHandler = async ({ email, password }) => {
    const result = await loginApi.request(email, password);

    if (!result.ok) {
      Toast.show(result.data, {
        duration: Toast.durations.SHORT,
        backgroundColor: theme["notification-error"],
      });

      return;
    }

    Toast.show(result.data.message, {
      duration: Toast.durations.SHORT,
      backgroundColor: theme["notification-success"],
    });

    setTimeout(() => {
      AsyncStorage.setItem("hasOnboarded", "true");
      var { user } = jwt_decode(result.headers["bearer-token"]);
      authContext.setUser(user);
      authStorage.storeToken(result.headers["bearer-token"]);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 300);
  };

  return (
    <>
      <Page>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <Heading style={{ marginBottom: 20, marginTop: 20 }}>Login</Heading>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={loginHandler}
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
                  {/* <Label style={{marginBottom: 10}}>Email</Label> */}
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
                  {/* <Label style={{marginBottom: 10}}>Password</Label> */}
                  <TextInput
                    placeholder="Password"
                    autoCompleteType="password"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secure={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    errorMessage={errors.password}
                    onBlur={() => setFieldTouched("password")}
                    errorVisible={touched.password}
                  />
                  <TextLink
                    onPress={() => console.log("Forgot Password")}
                    style={{ alignSelf: "flex-end", marginTop: 10 }}
                  >
                    Forgot Password?
                  </TextLink>
                </ScrollView>

                <Button
                  loading={loginApi.loading}
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Formik>

          <View
            style={{ marginTop: 20, marginBottom: 10, flexDirection: "row" }}
          >
            <Paragraph style={{ marginRight: 10 }}>New user?</Paragraph>
            <TextLink onPress={() => navigation.navigate("Register")}>
              Create account
            </TextLink>
          </View>
        </KeyboardAwareScrollView>
      </Page>
    </>
  );
}

const styles = StyleSheet.create({});
