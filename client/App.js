import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as eva from "@eva-design/eva";
import { default as theme } from "./app/config/theme.json"; // <-- Import app theme
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ThemeContext } from "./app/contexts/theme-context";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";

import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/contexts/auth";
import authStorage from "./app/auth/storage";

// Navigation
import navigationTheme from "./app/navigation/navigationTheme";
import OnboardingNavigator from "./app/navigation/onboarding";
import AuthNavigator from "./app/navigation/auth";
import AppTabNavigator from "./app/navigation/appTab";

export default function App() {
  const [haveFontsLoaded] = useFonts({
    "Poppins-Regular": require("./app/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./app/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./app/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./app/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./app/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./app/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Thin": require("./app/assets/fonts/Poppins-Thin.ttf"),
  });

  const [user, setUser] = useState();
  const [theme, setTheme] = useState('light');
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Onboarding");

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const computeInitialRoute = async () => {
    try {
      const value = await AsyncStorage.getItem("hasOnboarded");
      if (value == "true") {
        setInitialRoute("Auth");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const startUp = async () => {
    await restoreUser();
    await computeInitialRoute();
  };

  if (haveFontsLoaded && isReady) {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <AuthContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
              <NavigationContainer theme={navigationTheme}>
                {user ? (
                  <AppTabNavigator />
                ) : initialRoute == "Onboarding" ? (
                  <OnboardingNavigator />
                ) : (
                  <AuthNavigator />
                )}
              </NavigationContainer>
            </ApplicationProvider>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </>
    );
  }

  return (
    <AppLoading
      startAsync={startUp}
      onError={(err) => console.warn(err)}
      onFinish={() => setIsReady(true)}
    />
  );
}
