import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShelfHome from "../screens/main/home";

const Stack = createStackNavigator();

export default function ShelfNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        options={{ title: "Home" }}
        component={ShelfHome}
      />
    </Stack.Navigator>
  );
}
