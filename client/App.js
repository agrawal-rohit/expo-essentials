import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";
import { useColorScheme } from 'react-native';

import * as eva from "@eva-design/eva";
import lightTheme from "./app/config/lightTheme";
import darkTheme from "./app/config/darkTheme";
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
import authStorage from "./app/utilities/authStorage";

// Navigation
import OnboardingNavigator from "./app/navigation/onboarding";
import AuthNavigator from "./app/navigation/auth";
import AppTabNavigator from "./app/navigation/appTab";
import SafeScreen from "./app/components/SafeScreen";
import OfflineNotice from "./app/components/OfflineNotice";

export default function App() {
  const [haveFontsLoaded] = useFonts({
    "Jost-Regular": require("./app/assets/fonts/Jost-Regular.ttf"),
    "Jost-SemiBold": require("./app/assets/fonts/Jost-SemiBold.ttf"),
    "Jost-Bold": require("./app/assets/fonts/Jost-Bold.ttf"),
    "Jost-ExtraBold": require("./app/assets/fonts/Jost-ExtraBold.ttf"),
    "Jost-ExtraLight": require("./app/assets/fonts/Jost-ExtraLight.ttf"),
    "Jost-Light": require("./app/assets/fonts/Jost-Light.ttf"),
    "Jost-Medium": require("./app/assets/fonts/Jost-Medium.ttf"),
    "Jost-Thin": require("./app/assets/fonts/Jost-Thin.ttf"),
  });

  const systemThemeStyle = useColorScheme();

  const [user, setUser] = useState();
  const [theme, setTheme] = useState(systemThemeStyle);
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
            <ApplicationProvider
              {...eva}
              theme={
                theme == "light"
                  ? { ...eva.light, ...lightTheme }
                  : { ...eva.dark, ...darkTheme }
              }
            >
              <RootSiblingParent>
                <SafeScreen>
                  <OfflineNotice />
                  <NavigationContainer>
                    {user ? (
                      <AppTabNavigator />
                    ) : initialRoute == "Onboarding" ? (
                      <OnboardingNavigator />
                    ) : (
                      <AuthNavigator />
                    )}
                  </NavigationContainer>
                </SafeScreen>
              </RootSiblingParent>
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
