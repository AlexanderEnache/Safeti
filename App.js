import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import MapView from 'react-native-maps';


import Home from './src/Home';
import Other from './src/Other';
import Login from './src/Login';
import Signup from './src/Signup';
import Navbar from './src/Navbar';
import Account from './src/Account';
import Dependent from './src/Dependent';
import Draw from './src/routes/Drawer';
import Map from './src/Map';


Amplify.configure(awsconfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Navbar" component={Navbar} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Account" component={Account} />
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

const stylesMap = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});