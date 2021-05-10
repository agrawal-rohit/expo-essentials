import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileHome from "../screens/profile/home";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileHome"
    >
      <Stack.Screen
        name="ProfileHome"
        options={{ title: "Profile" }}
        component={ProfileHome}
      />
    </Stack.Navigator>
  );
}
