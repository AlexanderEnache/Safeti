import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  FlatList,
  Pressable,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dependents } from './models';
import { DataStore } from 'aws-amplify';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const Dependent = ({ navigation, route }) => {
    const [userEmail, setUserEmail] = useState('');
    const [dependentEmail, setDependentEmail] = useState('');
    const [location, setLocation] = useState(() => {
        return {lat: 45, lon: 45};
    });

    useEffect(() => {
        AsyncStorage.getItem("@user").then((value) => {
            setUserEmail(value);
            setDependentEmail(route.params.email);
            getDependentLocation();
        });
 
        // getDependentLocation();

        (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);
            console.log(location);
          })();
    }, []);

    async function getDependentLocation() {
        try{
            const models = await DataStore.query(Dependents);
            // console.log(models);

            for(let i = 0; i < models.length; i++){
                if(models[i].email == route.params.email){
                    setLocation({lat: Number(models[i].location.split(',')[0]), lon: Number(models[i].location.split(',')[1])});
                    console.log(models[i].location);
                }
            }
        }catch(e){
            console.log(e);
        }
    }

    console.log(userEmail);
    console.log(route.params.email);

    const DependentList = () => {
        const [dependents, setDependents] = useState([]);
      
        useEffect(() => {
          //query the initial todolist and subscribe to data updates
          const subscription = DataStore.observeQuery(Dependents).subscribe((snapshot) => {
            //isSynced can be used to show a loading spinner when the list is being loaded. 
            const { items, isSynced } = snapshot;
            // console.log(items);
            setDependents(items);
          });

          //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
          return function cleanup() {
            subscription.unsubscribe();
          }
      
        }, []);
      
        const renderItem = ({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Dependent");
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
        <Text>{ dependentEmail }</Text>
        <MapView style={styles.map} 
            region={{
                latitude: location.lat, 
                longitude: location.lon,
                latitudeDelta: 0.005, 
                longitudeDelta: 0.005
            }}
        />
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

export default Dependent;