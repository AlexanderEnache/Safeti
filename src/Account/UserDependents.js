import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  FlatList,
  Pressable
} from 'react-native';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';
import * as Location from 'expo-location';

const UserDependents = ({ route, navigation }) => {

    const DependentList = () => {
        const [dependents, setDependents] = useState([]);
        const [location, setLocation] = useState(null);
      
        useEffect(() => {

          console.log("TRYING TO MAKE IT WORK");
          console.log(route.params);

          const subscription = DataStore.observeQuery(Dependents).subscribe((snapshot) => {
            const { items, isSynced } = snapshot;

            let all = items.slice();
            
            for(let i = 0; i < items.length; i++){
              if(items[i].guardian !== route.params.userEmail){
                items.splice(i);
              }
            }
            
            setDependents(items);

            (async () => {
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
              }
              let loc = await Location.getCurrentPositionAsync({});
              setLocation({lat: loc.coords.latitude, lon: loc.coords.longitude});
  
              let sef = false;
              for(let i = 0; i < all.length; i++){
                // console.log(dependents[i].email + " ,,,,, " + userEmail);
  
                if(all[i].email == route.params.userEmail){
                  sef = all[i];
                  // console.log(dependents[i].email + " ,,,,, " + userEmail);
                  // dependents.splice(i);
                }
              }
              if(sef){
                await DataStore.save(Dependents.copyOf(sef, item => {
                  item.location = loc.coords.latitude + "," + loc.coords.longitude;
                }));
              }
            })();
          });

          //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
          return function cleanup() {
            subscription.unsubscribe();
          }
      
        }, []);

        const renderItem = ({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("DependentTabNavigator", {email: item.email, userEmail: route.params.userEmail});
            }}
            style={styles.todoContainer}
          >
            <Text>
              <Text>{item.name}</Text>
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