import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>#####  LELE MERA </Text>
      <Link href='/start' style={{
        color : 'blue'
      }}> start page </Link>



    </View>
  );
}
