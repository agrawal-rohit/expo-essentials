import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DiscoverHome from "../screens/browse/home";

const Stack = createStackNavigator();

export default function BrowseNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SearchScreen"
    >
      <Stack.Screen name="DiscoverHome" component={DiscoverHome} />
    </Stack.Navigator>
  );
}
