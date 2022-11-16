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

let toggle = false;

const Dependent = ({ route }) => {
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
  
  // const [toggle, setToggle] = useState(false);f
  const boundLength = 0.00090;
  let lat = 0; 
  let lon = 0;
  // let email = '';

  useEffect(() => {
    // AsyncStorage.getItem("@user").then((value) => {
    //   email = value;
    // });

    // console.log(route.params);

    getDependentLocation();

    setUserEmail(route.params.userEmail);
    setDependentEmail(route.params.email);

    console.log("HEEHRHEHEHEHREHRHERHEREHRHER");
    // console.log(route.params);
    // console.log(email);


    StartShit();

    // markBounds(email);

  }, []);

  async function StartShit(){
    const models = await DataStore.query(Bounds);
    console.log("Right here");
    console.log(models);

    for(let i = 0; i < models.length; i++){
      console.log("BEFORE");
      // console.log(email + " " + dependentEmail); 
      // console.log(models[i].guardian + " " + models[i].email);
      if(models[i].guardian != route.params.userEmail || models[i].email != route.params.email){
        console.log("SPLICESSSSS");
        // console.log(models[i]);
        models.splice(i);
        // console.log(models[i].email);
        // console.log(models[i].guardian);
        // console.log(models[i].location);
        // console.log(models[i].size);
        // console.log(models[i].time);
      }
    }

    if(models.length > 0){
      setBoundaryLat1(Number(models[0].location.split(',')[0]));
      setBoundaryLon1(Number(models[0].location.split(',')[1]));
      console.log("11111111111111");
    }

    if(models.length > 1){
      setBoundaryLat2(Number(models[1].location.split(',')[0]));
      setBoundaryLon2(Number(models[1].location.split(',')[1]));
      console.log("22222222222222");
    }

    if(models.length > 2){
      setBoundaryLat3(Number(models[2].location.split(',')[0]));
      setBoundaryLon3(Number(models[2].location.split(',')[1]));
      console.log("33333333333333");
    }

    if(models.length > 3){
      setBoundaryLat4(Number(models[3].location.split(',')[0]));
      setBoundaryLon4(Number(models[3].location.split(',')[1]));
      console.log("44444444444444");
    }

    if(models.length > 4){
      setBoundaryLat5(Number(models[4].location.split(',')[0]));
      setBoundaryLon5(Number(models[4].location.split(',')[1]));
      console.log("55555555555555");
    }

    // setBounds(models);

    // console.log(models);
  }
  


  ///////////////////////////////////////////////////////////////////
  
  const List = ({bounds}) => {
    // const [bounds, setBounds] = useStacte([]);
  
    // useEffect(() => {
    //   StartShit(email, dependentEmail);
    // }, []);

    // async function StartShit(email, dependentEmail){
    //   const models = await DataStore.query(Bounds);
    //   // console.log("Right here");
    //   // console.log(models);
  
    //   // for(let i = 0; i < models.length; i++){
    //   //   if(!(models[i].guardian == email && models[i].email == dependentEmail)){
    //   //     models.splice(i);
    //   //     // console.log(models[i].email);
    //   //     // console.log(models[i].guardian);
    //   //     // console.log(models[i].location);
    //   //     // console.log(models[i].size);
    //   //     // console.log(models[i].time);
    //   //   }
    //   // }
    //   setBounds(models);
    //   console.log(models);
    // }

    console.log(bounds);
  
    const renderItem = ({ item }) => (

      // <Text>AHAHAHAH</Text>

      <MapView.Circle
        // key = { '(this.state.currentLongitude + this.state.currentLongitude).toString()' }
        center = { {latitude: 42.308330, longitude: -82.878564} }
        // center = { {latitude: item.location.split(',')[0], longitude: item.location.split(',')[1]} }
        radius = { 40 }
        strokeWidth = { 1 }
        strokeColor = { '#1a66ff' }
        fillColor = { 'rgba(230,238,255,0.5)' }
        // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
      />

      // <Pressable
      //   onLongPress={() => {
      //     deleteTodo(item);
      //   }}
      //   onPress={() => {
      //     setComplete(!item.isComplete, item);
      //   }}
      //   style={styles.todoContainer}
      // >
      //   <Text>
      //     <Text style={styles.todoHeading}>{item.name}</Text>
      //     {`\n${item.description}`}
      //   </Text>
      //   <Text
      //     style={[styles.checkbox, item.isComplete && styles.completedCheckbox]}
      //   >
      //     {item.isComplete ? '✓' : ''}
      //   </Text>
      // </Pressable>
    );

    console.log("bounds");
    // console.log(bounds[0]);
  
    return (
      <FlatList
        data={bounds}
        // eyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    );
  };

  ///////////////////////////////////////////////////////////////////



  async function SetBoundary(coords) {
    // console.log(toggle);
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
    // console.log(toggle);
    if(toggle){
      return;
    }
    toggle = true;
    // console.log(toggle);
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
          // console.log(models[i].location);
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
      {/* {!toggle ?
        <View>
          <Pressable style={styles.buttonContainer} onPress={() => {Toggle()}}>
            <Text>Set Boundary</Text>
          </Pressable>
        </View>
      : <View>
          <Pressable style={styles.buttonContainerPressed} onPress={() => {Toggle()}}>
            <Text>Set Boundary</Text>
          </Pressable>
        </View>} */}

        {/* <Text>ASDASADSADSADSA</Text>
        <List bounds={bounds}/> */}

        {/* <List bounds={bounds}/> */}

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