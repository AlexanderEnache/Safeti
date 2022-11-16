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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDependents from './UserDependents';
import AddDependent from './AddDependent';
import AccountSettings from './AccountSettings';

const Account = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        AsyncStorage.getItem("@user").then((value) => {
            setUserEmail(value);
        });
        // console.log(userEmail);
        // const subscription = gyroscope.subscribe(({x,y,z}) => {
        //   console.log(x, y, z);
        // });

        // return () => {
        //   subscription.unsubscribe();
        // }
        

        // const options = {
        //   method: 'GET',
        //   url: 'https://jgentes-crime-data-v1.p.rapidapi.com/crime',
        //   params: {
        //     startdate: '9/19/2015',
        //     enddate: '9/25/2015',
        //     long: '-122.5076392',
        //     lat: '37.757815'
        //   },
        //   headers: {
        //     'X-RapidAPI-Key': '39224e976emsh24543633d5ae539p14bf00jsn6909443a7619',
        //     'X-RapidAPI-Host': 'jgentes-Crime-Data-v1.p.rapidapi.com'
        //   }
        // };

        // axios.request(options).then(function (response) {
        //   console.log("APASASPAPSASPASPAPPA");
        //   console.log(response.data);
        // }).catch(function (error) {
        //   console.error(error);
        // });

        // (async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //       setErrorMsg('Permission to access location was denied');
        //       return;
        //     }
        //     let loc = await Location.getCurrentPositionAsync({});
        //     setLocation({lat: loc.coords.latitude, lon: loc.coords.longitude});
        //     console.log(loc.coords.latitude);
        //     console.log(loc.coords.longitude);

        //     // async function setComplete(updateValue, todo) {
        //     //update the todo item with updateValue

        //     // const models = await DataStore.query(Dependents);
        //     // console.log(models);

        //     // await DataStore.save(
        //     //   Dependents.copyOf(todo, updated => {
        //     //     updated.isComplete = updateValue
        //     //   })
        //     // );
        // })();
    }, []);

    // console.log(userEmail);

       // 1 866 975 0925
const Tab = createBottomTabNavigator();

// Tab.navigationOptions.headerLeft = null;

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Dependents" children={props => <UserDependents userEmail={userEmail} {...props} />} />
        <Tab.Screen name="Add Dependent" component={AddDependent} />
        <Tab.Screen name="Log Out" component={AccountSettings} />
      </Tab.Navigator>
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

export default Account;