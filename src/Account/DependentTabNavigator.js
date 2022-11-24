import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Dependent from './Dependent';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';
import SetBoundary from './SetBoundary';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

let toggle = false;

const DependentTabNavigator = ({ route }) => {
  const [email, setUserEmail] = useState('');
  const [dependentEmail, setDependentEmail] = useState('');
  const [location, setLocation] = useState(() => {
    return {lat: 45, lon: 45};
  });

  useEffect(() => {
    console.log(route.params);
    getDependentLocation();
  }, []);

  async function getDependentLocation() {
    try{
        const models = await DataStore.query(Dependents);
        // console.log(models);

        for(let i = 0; i < models.length; i++){
            if(models[i].email == route.params.email){
                console.log(models[i].location);
                setLocation({lat: Number(models[i].location.split(',')[0]), lon: Number(models[i].location.split(',')[1])});
            }
        }
    }catch(e){
        console.log(e);
    }
  }


  const Tab = createStackNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Dependent" component={Dependent} 
            initialParams={{userEmail: route.params.userEmail, email: route.params.email, location: location}}
            options={{
                header: () => (
                  null
                ),
                // tabBarLabel: 'Home',
                tabBarIcon: () => (
                  null
                ),
              }}/>
        <Tab.Screen name="SetBoundary" component={SetBoundary} 
            initialParams={{email: route.params.userEmail, dependentEmail: route.params.email}}
            options={{
                header: () => (
                  null
                ),
              }}/>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  panel:{
    position: 'relative'
  },
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  buttonContainerPressed: {
    alignSelf: 'center',
    backgroundColor: 'white',
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

export default DependentTabNavigator;