import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import Screen from "../../components/Screen";

import colors from "../../config/colors";

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
    <Text style={{ color: colors.primary, fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
    <Text style={{ color: colors.primary, fontSize: 16 }}>Get Started</Text>
  </TouchableOpacity>
);

const Dots = ({ selected }) => {
  return (
    <View
      style={{
        width: 7,
        height: 7,
        marginHorizontal: 2,
        backgroundColor: selected ? colors.primary : colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
      }}
    />
  );
};

var { width, height, scale } = Dimensions.get("screen");

export default function OnboardingScreen({ navigation }) {
  return (
    <Screen withPadding={false}>
      <Onboarding
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        DoneButtonComponent={Done}
        NextButtonComponent={Next}
        DotComponent={Dots}
        bottomBarHighlight={false}
        containerStyles={styles.containerStyles}
        titleStyles={styles.titleStyles}
        subTitleStyles={styles.subTitleStyles}
        imageContainerStyles={styles.imageContainer}
        pages={[
          {
            backgroundColor: colors.white,
            image: (
              <Image
                source={require("../../assets/images/onboarding1.png")}
                style={styles.image}
              />
            ),
            title: "Make reading fun",
            subtitle: "Read like a video game",
          },
          {
            backgroundColor: colors.white,
            image: (
              <Image
                source={require("../../assets/images/onboarding2.png")}
                style={styles.image}
              />
            ),
            title: "Get good",
            subtitle: "Keep Learning and achieve your goals",
          },
          {
            backgroundColor: colors.white,
            image: (
              <Image
                source={require("../../assets/images/onboarding3.png")}
                style={styles.image}
              />
            ),
            title: "Make it a habit",
            subtitle: "Stay accountable with reading groups",
          },
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  containerStyles: {
    justifyContent: "flex-start",
    top: 0.05 * height * scale,
  },
  imageContainer: {
    paddingBottom: 0.04 * height * scale,
  },
  titleStyles: {
    fontSize: 22,
    fontFamily: "Poppins-ExtraBold",
  },
  subTitleStyles: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  image: {
    width: 0.7 * width,
    height: 0.7 * width,
  },
});
