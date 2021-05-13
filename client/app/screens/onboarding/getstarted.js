import React from "react";
import { View } from "react-native";

import Page from "../../components/Page";
import Heading from "../../components/Heading";
import Button from '../../components/Button';
import Paragraph from "../../components/Paragraph";

export default function getstarted({ navigation }) {
  return (
    <Page>
      <View style={{ flex: 1}}>
        <Heading fontSize={32} style={{ marginTop: 30, marginBottom: 10 }}>
          Welcome to this app
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mi
          elit, euismod et tincidunt eu, sodales et leo. Donec vel mauris
          imperdiet, fringilla diam ut, aliquet nisl. Nulla dui erat,
          sollicitudin vel rutrum eu, faucibus et magna. 
        </Paragraph>
      </View>
      
      <Button onPress={() => navigation.navigate('Onboarding')}>Get started</Button>
    </Page>
  );
}
