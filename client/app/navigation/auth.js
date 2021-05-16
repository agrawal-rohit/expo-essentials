import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";
import LoadingScreen from "../screens/loading";
import AppTabNavigator from "./appTab";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Home" component={AppTabNavigator} />
      </Stack.Navigator>
  );
}
