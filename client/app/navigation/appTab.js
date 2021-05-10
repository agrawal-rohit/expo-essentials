import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseNavigator from "./browse";
import HomeNavigator from "./home";
import ProfileNavigator from "./profile";

import colors from "../config/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Library"
      tabBarOptions={{
        activeBackgroundColor: colors.white,
        activeTintColor: colors.primary,
        labelStyle: { marginBottom: 10, marginTop: 0 },
        style: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Browse"
        component={BrowseNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="library-shelves"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
