import React from 'react';
import { StatusBar, StyleSheet, View, Text, Button } from 'react-native';
// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

const Navbar = ({ navigation }) => {
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Nav Screen</Text>
                <Button
                    title="Go to Details.......... again"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>      
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Navbar;