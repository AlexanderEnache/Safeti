import React from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';


// Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
        

const Navbar = ({ navigation }) => {
    return (
        <>
        <ImageBackground
            source={require('./ptp.png')}
            style={{width: '100%', height: '100%'}}>
            
            <View style={styles.view}>
                {/* <Text>Nav Screen</Text>
                <Button
                    style='button'
                    title="Go to Details.......... again"
                    onPress={() => navigation.navigate('Home')}
                /> */}
                
                <Pressable onPress={() => {navigation.navigate('Home')}}
                style = {styles.button}>
                    <Text style={styles.text}>Home</Text>
                </Pressable>

                <Pressable onPress={() => {navigation.navigate('Login')}}
                style = {styles.button}>
                    <Text style={styles.text}>Login</Text>
                </Pressable>
                
                <Pressable onPress={() => {navigation.navigate('Signup')}}
                style = {styles.button}>
                    <Text style={styles.text}>Signup</Text>
                </Pressable>     

                <Pressable onPress={() => {navigation.navigate('Exit')}}
                style = {styles.button}>
                    <Text style={styles.text}>Exit</Text>
                </Pressable>             
                
                
            </View>  
        </ImageBackground>    
        </>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'powderblue',
    textAlign: 'center',
    FontFace: 'Cochin'
  },
  button: {
    backgroundColor:  'darkblue',
    borderColor: 'black',
    marginVertical: '5%',
    height: '5%',
    width: '25%',
    justifyContent:'center',
    textAlignVertical: 'center',
    borderRadius:10,
    
  },
  view: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  }
});



export default Navbar;