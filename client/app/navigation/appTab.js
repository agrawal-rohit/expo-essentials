import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseNavigator from "./browse";
import HomeNavigator from "./home";
import ProfileNavigator from "./profile";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BrowseIcon = (props) => <Icon {...props} name="search" />;

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const ProfileIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    style={{paddingTop: 10}}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Browse" icon={BrowseIcon} />
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Profile" icon={ProfileIcon} />
  </BottomNavigation>
);

export default function AppTabNavigator() {
  return (
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Browse"
          component={BrowseNavigator}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="compass"
                size={size}
                color={color}
              />
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
