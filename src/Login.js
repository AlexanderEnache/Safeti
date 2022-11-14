import React, { useState, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Alert
} from 'react-native';
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      AutoLogin();
    }, []);

    async function AutoLogin() {
      try {
          const user = await Auth.signIn("mazerat23@gmail.com", "Password1@");
          await AsyncStorage.setItem('@user', "mazerat23@gmail.com");
          navigation.navigate('Safeti');
      } catch (e) {
          console.log(e.message);
          Alert.alert(
              "",
              e.message,
          );
      }
    }

    async function LoginUser() {
        try {
            const user = await Auth.signIn(email, password);
            await AsyncStorage.setItem('@user', email);
            navigation.navigate('Safeti');
        } catch (e) {
            console.log(e.message);
            Alert.alert(
                "",
                e.message,
            );
        }
    }

  return (
    <>
        <View>
            <TextInput
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.modalInput}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                style={styles.modalInput}
            />
            <Pressable
                onPress={() => {
                    LoginUser();
                }}
            >
                <Text>Login</Text>
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

export default Login;