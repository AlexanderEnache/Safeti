import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  FlatList,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const UserDependents = ({ navigation }) => {
    // const [location, setLocation] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        AsyncStorage.getItem("@user").then((value) => {
            setUserEmail(value);
        });
        // (async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //       setErrorMsg('Permission to access location was denied');
        //       return;
        //     }
        //     let loc = await Location.getCurrentPositionAsync({});
        //     setLocation({lat: loc.coords.latitude, lon: loc.coords.longitude});
        //     console.log(loc.coords.latitude);
        // })();
    }, []);

    console.log(userEmail);


    const DependentList = () => {
        const [dependents, setDependents] = useState([]);
      
        useEffect(() => {
          const subscription = DataStore.observeQuery(Dependents).subscribe((snapshot) => {
            const { items, isSynced } = snapshot;
            setDependents(items);
          });
      
            console.log(dependents);

          //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
          return function cleanup() {
            subscription.unsubscribe();
          }
      
        }, []);
      
        // async function deleteTodo(todo) {
        //   try {
        //     await DataStore.delete(todo);
        //   } catch (e) {
        //     console.log('Delete failed: $e');
        //   }
        // }
      
        // async function setComplete(updateValue, todo) {
        //   //update the todo item with updateValue
        //   await DataStore.save(
        //     Todo.copyOf(todo, updated => {
        //       updated.isComplete = updateValue
        //     })
        //   );
        // }
      
        const renderItem = ({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Dependent", { email: item.email });
            }}
            style={styles.todoContainer}
          >
            <Text>
              <Text>{item.email}</Text>
            </Text>
          </Pressable>
        );
      
        return (
          <FlatList
            data={dependents}
            keyExtractor={({ email }) => email}
            renderItem={renderItem}
          />
        );
      };
      

  return (
    <>
        <DependentList />
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

export default UserDependents;