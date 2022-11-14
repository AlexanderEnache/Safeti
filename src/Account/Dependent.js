import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  Pressable,
  Dimensions,
  View,
  Alert
} from 'react-native';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';
import MapView from 'react-native-maps';

let toggle = false;

const Dependent = ({ navigation, route }) => {
    // const [userEmail, setUserEmail] = useState('');
    // const [dependentEmail, setDependentEmail] = useState('');
    const [boundaryLat, setBoundaryLat] = useState(0);
    const [boundaryLon, setBoundaryLon] = useState(0);
    const [isToggle, setIsToggle] = useState(false);
    const [location, setLocation] = useState(() => {
        return {lat: 45, lon: 45};
    });
    // const [toggle, setToggle] = useState(false);f
    const boundLength = 0.00090;
    let lat = 0; 
    let lon = 0;

    useEffect(() => {

      console.log(location.lat);

        // AsyncStorage.getItem("@user").then((value) => {
        //     setUserEmail(value);
        // });

        // setDependentEmail(route.params.email);
        getDependentLocation();

        // (async () => {
      
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //       setErrorMsg('Permission to access location was denied');
        //       return;
        //     }
      
        //     let location = await Location.getCurrentPositionAsync({});
        //   })();
    }, []);

    async function SetBoundary(coords) {
      console.log(toggle);
      if(!toggle){
        return;
      }

      toggle = false;
      
      lat = coords.nativeEvent.coordinate.latitude;
      lon = coords.nativeEvent.coordinate.longitude;

      setBoundaryLat(lat);
      setBoundaryLon(lon);

      // isBetween

      if(
        location.lat > lat + boundLength/2 || 
        location.lat < lat - boundLength/2 ||
        location.lon > lon + boundLength/2 || 
        location.lon < lon - boundLength/2
      ){
        // console.log("Out of Bounds");
        Alert.alert(
          "",
          "Your child is currently OUT OF BOUNDS",
        );
      }else{
        Alert.alert(
          "",
          "Your child is currently in bounds",
        );
      }
  }

  function Toggle() {
    console.log(toggle);
    if(toggle){
      return;
    }
    toggle = true;
    console.log(toggle);
    Alert.alert(
      "",
      "Click where you want to set a boundary",
    );
    setIsToggle(toggle);
  }

    async function getDependentLocation() {
        try{
            const models = await DataStore.query(Dependents);
            // console.log(models);

            for(let i = 0; i < models.length; i++){
              console.log(models[i].location);
                if(models[i].email == route.params.email){
                    setLocation({lat: Number(models[i].location.split(',')[0]), lon: Number(models[i].location.split(',')[1])});
                    // console.log(models[i].location);
                }
            }
        }catch(e){
            console.log(e);
        }
    }

  return (
    <>
      <View>
      {!toggle ?
        <View>
          <Pressable style={styles.buttonContainer} onPress={() => {Toggle()}}>
            <Text>Set Boundary</Text>
          </Pressable>
        </View>
      : <View>
          <Pressable style={styles.buttonContainerPressed} onPress={() => {Toggle()}}>
            <Text>Set Boundary</Text>
          </Pressable>
        </View>}
        <MapView style={styles.map} 
            region={{
                latitude: location.lat, 
                longitude: location.lon,
                latitudeDelta: 0.005, 
                longitudeDelta: 0.005
            }}
            onPress={SetBoundary}
        >
        <MapView.Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lon
          }}
          title={"title"}
          description={"description"}
        />


        <MapView.Circle
                key = { '(this.state.currentLongitude + this.state.currentLongitude).toString()' }
                center = { {latitude: boundaryLat, longitude: boundaryLon} }
                radius = { 40 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
                // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
        />
        </MapView>
      </View>
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

export default Dependent;