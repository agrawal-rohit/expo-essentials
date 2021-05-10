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
import AuthContext from "../auth/context";
import jwt_decode from "jwt-decode";

// Components
import Screen from "../components/Screen";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";

// API
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import authStorage from "../auth/storage";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const [loginError, setLoginError] = useState(null);
  const loginApi = useApi(authApi.login);
  const authContext = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    const result = await loginApi.request(email, password);

    if (loginApi.error) {
      setLoginError(loginApi.errorMessage);
      Alert.alert("Authentication Error", loginError);
      return;
    }

    AsyncStorage.setItem("hasOnboarded", "true");
    var { user } = jwt_decode(result.data.auth_token);
    authContext.setUser(user);
    authStorage.storeToken(result.data.auth_token);

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    // navigation.navigate("Home");
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen>
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
                  <TextLink
                    onPress={() => console.log("Forgot Password")}
                    style={{ alignSelf: "flex-end", marginTop: 10 }}
                  >
                    Forgot Password?
                  </TextLink>
                </ScrollView>

                <Button onPress={handleSubmit} style={{ marginTop: 20 }}>
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
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});
