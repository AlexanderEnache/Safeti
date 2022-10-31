import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Home';
import Other from './src/Other';
import Login from './src/Login';
import Signup from './src/Signup';
// import { Todo } from './src/models';
import Navbar from './src/Navbar';


Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Navbar" component={Navbar} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Other" component={Other} />
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