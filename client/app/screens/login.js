import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Toast from 'react-native-root-toast';
import { useTheme } from '@ui-kitten/components';

import AuthContext from '../contexts/auth';

// Components
import Page from '../components/Page';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import TextLink from '../components/TextLink';
import Modal from '../components/Modal';

import Firebase from '../config/firebase';

// API
import authStorage from '../utilities/authStorage';

const loginValidationSchema = Yup.object({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const resetValidationSchema = Yup.object({
  email: Yup.string().required().email().label('Email'),
});

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const theme = useTheme();

  const loginHandler = async ({ email, password }) => {
    setLoading(true);

    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdToken();

            // Profile updated successfully!
            Toast.show('Login Successful', {
              duration: Toast.durations.SHORT,
              backgroundColor: theme['notification-success'],
            });

            setLoading(false);

            setTimeout(() => {
              AsyncStorage.setItem('hasOnboarded', 'true');
              authContext.setUser(user);
              authStorage.storeToken(token);

              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            }, 300);
          }
        });
      })
      .catch((error) => {
        Toast.show(error, {
          duration: Toast.durations.SHORT,
          backgroundColor: theme['notification-error'],
        });
      });
  };

  const resetPassword = async ({ email }) => {
    setLoading(true);
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
        Toast.show('Email sent!', {
          duration: Toast.durations.SHORT,
          backgroundColor: theme['notification-success'],
        });

        setModalVisible(false);
        setLoading(false);
      })
      .catch((error) => {
        // An error happened.
        Toast.show(error, {
          duration: Toast.durations.SHORT,
          backgroundColor: theme['notification-error'],
        });
      });
  };

  return (
    <>
      <Page>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <Heading style={{ marginBottom: 20, marginTop: 20 }}>Login</Heading>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={loginHandler}
            validationSchema={loginValidationSchema}
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
                    onChangeText={handleChange('email')}
                    errorMessage={errors.email}
                    onBlur={() => setFieldTouched('email')}
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
                    secure
                    value={values.password}
                    onChangeText={handleChange('password')}
                    errorMessage={errors.password}
                    onBlur={() => setFieldTouched('password')}
                    errorVisible={touched.password}
                  />
                  <TextLink
                    onPress={() => setModalVisible(true)}
                    style={{ alignSelf: 'flex-end', marginTop: 10 }}
                  >
                    Forgot Password?
                  </TextLink>
                </ScrollView>

                <Button
                  loading={loading}
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                >
                  Sign In
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
            <Button color="#4285F4" style={{ flex: 1, marginRight: 10 }}>
              <AntDesign name="google" size={16} color="white" />
            </Button>
            <Button color="#3b5999" style={{ flex: 1 }}>
              <FontAwesome name="facebook" size={16} color="white" />
            </Button>
          </View> */}

          <View
            style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row' }}
          >
            <Paragraph style={{ marginRight: 10 }}>New user?</Paragraph>
            <TextLink onPress={() => navigation.navigate('Register')}>
              Create account
            </TextLink>
          </View>
        </KeyboardAwareScrollView>
      </Page>
      <Modal
        visible={modalVisible}
        modalTitle="Reset password"
        onClose={() => setModalVisible(false)}
      >
        <Paragraph style={{ marginBottom: 10 }}>
          Enter your email address
        </Paragraph>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={resetPassword}
          validationSchema={resetValidationSchema}
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
              <TextInput
                placeholder="Email"
                autoCompleteType="email"
                keyboardType="email-address"
                returnKeyType="next"
                textContentType="emailAddress"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                errorMessage={errors.email}
                onBlur={() => setFieldTouched('email')}
                errorVisible={touched.email}
              />
              <Button
                loading={loading}
                onPress={handleSubmit}
                style={{ marginTop: 20 }}
              >
                Send password reset email
              </Button>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}
