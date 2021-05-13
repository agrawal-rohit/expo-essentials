import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";
import SubHeading from "./SubHeading";

export default function CustomButton({ children, loading = false, ...props }) {
  const LoadingIndicator = (props) => (
    <View style={styles.indicator}>
      <Spinner status="basic" size='small'/>
    </View>
  );

  const ButtonText = ({children, loading}) => {
    if(loading) return null
    return <SubHeading fontSize={14} style={{textTransform: 'uppercase'}}>{children}</SubHeading>
}

  return <Button children={ButtonText({children, loading})} accessoryLeft={loading ? LoadingIndicator : null} {...props}>
    </Button>;
}

const styles = StyleSheet.create({
  buttonStyle: {
    fontSize: 16,
    fontFamily: "Jost-Medium",
    textTransform: 'uppercase'
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
