import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const image = require('../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Home Page</Text>
  </View>
);

const DetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Details Page</Text>
  </View>
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <ImageBackground source={image} style={styles.image}>
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <HomeScreen></HomeScreen>
    </ImageBackground>
  );
}
