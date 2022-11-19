import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  TextInput,
  Pressable,
  View,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';

const AddDependent = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        AsyncStorage.getItem("@user").then((value) => {
            setUserEmail(value);
        });
    }, []);

    console.log(userEmail);

    async function Add() {

        // try {
        //     const user = await Auth.signIn(username, password);
        // } catch (error) {
        //     console.log('error signing in', error);
        // }

        try{
            email
            await DataStore.save(
                new Dependents({
                    "email": email,
                    "guardian": userEmail,
                    "name": name
                })
            );
        }catch(e){
            console.log(e.message);
            Alert.alert(
                "",
                e.message,
                // [
                //   {
                //     text: "Ask me later",
                //     onPress: () => console.log("Ask me later pressed")
                //   },
                //   {
                //     text: "Cancel",
                //     onPress: () => console.log("Cancel Pressed"),
                //     style: "cancel"
                //   },
                //   { text: "OK", onPress: () => console.log("OK Pressed") }
                // ]
            );
        }
    }


  return (
    <>
        <ImageBackground
            source={require('./bg.png')}
            style={{width: '100%', height: '100%'}}>
        <View style={styles.center}>
            <TextInput
                onChangeText={ text => setEmail(text.toLowerCase()) }
                placeholder="Email"
                style={styles.modalInput}
            />
            <TextInput
                onChangeText={setName}
                placeholder="Name"
                style={styles.modalInput}
            />
            <Pressable style = {styles.buttonContainer}
                onPress={() => {
                    Add();
                }}
            >
                <Text>Signup</Text>
            </Pressable>
        </View>
        </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4696ec',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
  },
  todoContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  todoHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
  checkbox: {
    borderRadius: 2,
    borderWidth: 2,
    fontWeight: '700',
    height: 20,
    marginLeft: 'auto',
    textAlign: 'center',
    width: 20,
  },
  completedCheckbox: {
    backgroundColor: '#000',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
    marginTop: 50,
    //width:'0%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    padding: 16,
  },
  modalInput: {
    borderWidth: 1,
    //marginBottom:8,
    padding: 10,
    backgroundColor: 'darkgrey',
    marginTop:20,
    //justifyContent: 'center',
    alignContent: 'center',
    // width: '80%',
    // height: '15%',
    opacity: '0.75',
  },
  modalDismissButton: {
    marginLeft: 'auto',
  },
  modalDismissText: {
    fontSize: 20,
    fontWeight: '700',
  },
  center: {
    //justifyContent:'flex',
    //alignContent: 'center',
    alignSelf:'center',
    height: '10%',
    width: '95%',
  }
});

export default AddDependent;