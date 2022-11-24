import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  Pressable,
  Dimensions,
  View,
  Alert,
  AsyncStorage,
  FlatList
} from 'react-native';
import { Dependents } from '../models';
import { DataStore } from 'aws-amplify';
import MapView from 'react-native-maps';
import { Bounds } from '../models';
import { NavigationHelpersContext } from '@react-navigation/native';

let toggle = false;

const Dependent = ({ navigation, route }) => {
  const [email, setUserEmail] = useState('');
  const [dependentEmail, setDependentEmail] = useState('');

  const [boundaryLat, setBoundaryLat] = useState(0);
  const [boundaryLon, setBoundaryLon] = useState(0);
  
  const [boundaryLat1, setBoundaryLat1] = useState(0);
  const [boundaryLon1, setBoundaryLon1] = useState(0);
    
  const [boundaryLat2, setBoundaryLat2] = useState(0);
  const [boundaryLon2, setBoundaryLon2] = useState(0);
    
  const [boundaryLat3, setBoundaryLat3] = useState(0);
  const [boundaryLon3, setBoundaryLon3] = useState(0);
    
  const [boundaryLat4, setBoundaryLat4] = useState(0);
  const [boundaryLon4, setBoundaryLon4] = useState(0);
    
  const [boundaryLat5, setBoundaryLat5] = useState(0);
  const [boundaryLon5, setBoundaryLon5] = useState(0);

  const [isToggle, setIsToggle] = useState(false);
  const [location, setLocation] = useState(() => {
      return {lat: 45, lon: 45};
  });
  const [bounds, setBounds] = useState([]);

  const boundLength = 0.00090;
  let lat = 0; 
  let lon = 0;

  useEffect(() => {
    getDependentLocation();

    setUserEmail(route.params.userEmail);
    setDependentEmail(route.params.email);

    StartShit();
  }, []);

  async function StartShit(){
    const models = await DataStore.query(Bounds);
    let i = 0;
    let arr = [];

    for(; i < models.length; i++){
      if(models[i].guardian != route.params.userEmail || models[i].email != route.params.email){
        console.log("SPLICESSSSS");
      }else{
        arr.push(models[i]);
      }
    }

    if(arr.length > 0){
      setBoundaryLat1(Number(arr[0].location.split(',')[0]));
      setBoundaryLon1(Number(arr[0].location.split(',')[1]));
    }

    if(arr.length > 1){
      setBoundaryLat2(Number(arr[1].location.split(',')[0]));
      setBoundaryLon2(Number(arr[1].location.split(',')[1]));
    }

    if(arr.length > 2){
      setBoundaryLat3(Number(arr[2].location.split(',')[0]));
      setBoundaryLon3(Number(arr[2].location.split(',')[1]));
    }

    if(arr.length > 3){
      setBoundaryLat4(Number(arr[3].location.split(',')[0]));
      setBoundaryLon4(Number(arr[3].location.split(',')[1]));
    }

    if(arr.length > 4){
      setBoundaryLat5(Number(arr[4].location.split(',')[0]));
      setBoundaryLon5(Number(arr[4].location.split(',')[1]));
    }
  }

  async function SetBoundary(coords) {
    console.log(coords);
    if(!toggle){
      return;
    }

    toggle = false;
    
    lat = coords.nativeEvent.coordinate.latitude;
    lon = coords.nativeEvent.coordinate.longitude;

    navigation.navigate("SetBoundary", {location: lat+","+lon});
  }

  // function Toggle() {
  //   // console.log(toggle);
  //   if(toggle){
  //     return;
  //   }
  //   toggle = true;
  //   // console.log(toggle);
  //   Alert.alert(
  //     "",
  //     "Click where you want to set a boundary",
  //   );
  //   setIsToggle(toggle);
  // }

  async function getDependentLocation() {
    try{
        const models = await DataStore.query(Dependents);
        // console.log(models);

        for(let i = 0; i < models.length; i++){
            if(models[i].email == route.params.email){
                setLocation({lat: Number(models[i].location.split(',')[0]), lon: Number(models[i].location.split(',')[1])});
            }
        }
    }catch(e){
        console.log(e);
    }
  }

  return (
    <>
      <View>
        <View>
          <Pressable style={styles.buttonContainerPressed} onPress={() => {
            toggle = true;
            Alert.alert(
              "",
              "Click where you want to set a boundary",
            );}}>
            <Text>Set Boundary</Text>
          </Pressable>
          <Pressable style={styles.buttonContainerPressed} onPress={() => {
            navigation.navigate("SetBoundary", {lat: null, lon: null});
          }}>
            <Text>View Boundaries</Text>
          </Pressable>
        </View>

        <MapView id={"mapid"} style={styles.map} 
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
            key = { '(this.state.current3Longitude + this.state.currentLongitude).toString()1' }
            center = { {latitude: boundaryLat, longitude: boundaryLon} }
            radius = { 40 }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(230,238,255,0.5)' }
            // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
          />

          <MapView.Circle
            key = { '(this.state.current3Longitude + this.state.currentLongitude).toString()1' }
            center = { {latitude: boundaryLat1, longitude: boundaryLon1} }
            radius = { 40 }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(230,238,255,0.5)' }
            // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
          />

          <MapView.Circle
            key = { '(this.state.current3Longitude + this.state.currentLongitude).toString(2)' }
            center = { {latitude: boundaryLat2, longitude: boundaryLon2} }
            radius = { 40 }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(230,238,255,0.5)' }
            // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
          />

          <MapView.Circle
            key = { '(this.state.current3Longitude + this.state.currentLongitude).toString(3)' }
            center = { {latitude: boundaryLat3, longitude: boundaryLon3} }
            radius = { 40 }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(230,238,255,0.5)' }
            // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
          />

          <MapView.Circle
            key = { '(this.state.current3Longitude + this.state.currentLongitude).toString(4)' }
            center = { {latitude: boundaryLat4, longitude: boundaryLon4} }
            radius = { 40 }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(230,238,255,0.5)' }
            // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
          />

          <MapView.Circle
            key = { '(this.state.current3Longitude + this.state.currentLongitude).toString5()' }
            center = { {latitude: boundaryLat5, longitude: boundaryLon5} }
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