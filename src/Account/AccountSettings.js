import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  Pressable,
  View,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';


const Account = ({ navigation }) => {
    // useEffect(() => {
    //     AsyncStorage.getItem("@user").then((value) => {
    //         setUserEmail(value);
    //     });
    // }, []);

  return (
    <>
        <ImageBackground
            source={require('./bg.png')}
            style={{width: '100%', height: '100%'}}>
        <View style={styles.center}>
            <Text style={styles.warningText}>Are you sure you'd like to logout?</Text>
            <Pressable style={styles.buttonContainer}
                onPress={async () => {
                    try {
                        await Auth.signOut();
                    } catch (error) {
                        console.log('error signing out: ', error);
                    }
                    navigation.navigate('Home Page');
                }}
            >
                <Text>Signout</Text>
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
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
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
    marginTop: '10%'
  },
  warningText: {
    color:'black',
    fontSize:24,
    alignSelf:'center',
    marginBottom: 25
  }
});

export default Account;