import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "../screens/onboarding/swiper";
import GetStartedScreen from "../screens/onboarding/getstarted";
import RegisterScreen from "../screens/register";

import AuthNavigator from "./auth";

const Stack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="GetStarted"
      >
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={AuthNavigator} />
      </Stack.Navigator>
  );
}
