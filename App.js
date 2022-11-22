import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home';
import Login from './src/Login';
import Signup from './src/Signup';
import Navbar from './src/Navbar';
import Account from './src/Account/Account';
import Dependent from './src/Account/Dependent';
import DependentTabNavigator from './src/Account/DependentTabNavigator';

Amplify.configure(awsconfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home Page" component={Navbar} 
              options={{
                header: () => (
                  null
                ),
              }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Safeti" component={Account} 
             options={{
              headerLeft: () => (
                null
              ),
            }}
            />
            <Stack.Screen name="DependentTabNavigator" component={DependentTabNavigator} />
            <Stack.Screen name="Dependent" component={Dependent} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
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