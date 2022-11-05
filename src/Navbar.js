import React from 'react';
import { StatusBar, StyleSheet, View, Text, Button } from 'react-native';
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
                <Text>Nav Screen</Text>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
                <Text>Signup</Text>
                <Button
                    title="Signup"
                    onPress={() => navigation.navigate('Signup')}
                />
                <Text>Nav Screen</Text>
                <Button
                    title="Drawer"
                    onPress={() => navigation.navigate('Draw')}
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