import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Amplify } from 'aws-amplify';
// import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Login';
import Signup from '../Signup';
// import Navbar from '../src/Navbar';


// Amplify.configure(awsconfig);

// const Draw = createDrawerNavigator({
//     Login: {
//         screen: Login
//     },
//     Signup: {
//         screen: Signup
//     },
// });

const Drawer = createDrawerNavigator();

const Draw = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Signup" component={Signup} />
          </Drawer.Navigator>
      </NavigationContainer>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Draw;