import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  TextInput,
  Pressable,
  View
} from 'react-native';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';

const AddDependent = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function Add() {
        try{
            email
            await DataStore.save(
                new Dependents({
                    "email": email,
                    "guardian": route.params.userEmail,
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
        <View>
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
            <Pressable
                onPress={() => {
                    Add();
                }}
            >
                <Text>Signup</Text>
            </Pressable>
        </View>
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
});

export default AddDependent;