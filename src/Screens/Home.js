import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform, TextInput,ScrollView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';
import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import Loader from '../components/Loader';
import { locationPermission, getCurrentLocation } from '../helper/helperFunction';
import Map from './Map'
import Menu from './Menu'
import AddressPickup from '../components/AddressPickup';
import SideMenu from 'react-native-side-menu-updated'
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({ navigation }) => {
    const mapRef = useRef()
    const markerRef = useRef()

    const [state, setState] = useState({
        curLoc: {
            latitude: 30.7046,
            longitude: 77.1025,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: 30.7046,
            longitude: 77.1025,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0

    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));


    useEffect(() => {
        getLiveLocation()
    }, [])

    const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
        console.log("zip code==>>>",zipCode)
        console.log('city texts',cityText)
        setState({
            ...state,
            destinationCords: {
                latitude: lat,
                longitude: lng
            }
        })
        onCenter()
    }

    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude, heading } = await getCurrentLocation()
            console.log("get live location after 4 second",heading)
            animate(latitude, longitude);
            updateState({
                heading: heading,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            })
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation()
        }, 6000);
        return () => clearInterval(interval)
    }, [])

    const onPressLocation = () => {
        navigation.navigate('chooseLocation', { getCordinates: fetchValue })
    }
    const fetchValue = (data) => {
        console.log("this is data", data)
     
        updateState({
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }
        })
     
    }

    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }

    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }
    const menu = <Menu navigation={navigation}/>;
    
    const onTouch = () => {
        console.log('hola')
    }

    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })
    }

    return (
        <SideMenu autoClosing={false} menu={menu}>
        <View style={styles.container}>
        <View style={styles.rect2}>
          <Image
            source={require("../assets/images/logo-babsontrans.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image><TouchableOpacity onPress={onTouch}  style={styles.inpuStyle}><ScrollView
          
                keyboardShouldPersistTaps="handled"
                
            >
              
                <AddressPickup
                  
                    placheholderText="Enter Destination Location"
                    fetchAddress={fetchDestinationCords}
                />
            </ScrollView></TouchableOpacity>
        </View>
      <View style={{ flex: 1,top:100 }}>
           
            <View style={{ flex: 1 }}>
                <MapView
                  mapTypeId= 'satellite'
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >

                    <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}
                    >
                        <Image
                            source={imagePath.icBike}
                            style={{
                                width: 40,
                                height: 40,
                                transform: [{rotate: `${heading}deg`}]
                            }}
                            resizeMode="contain"
                        />
                    </Marker.Animated>

                    {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={imagePath.icGreenMarker}
                    />)}

                    {Object.keys(destinationCords).length > 0 && (<MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={6}
                        strokeColor='#064'
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            fetchTime(result.distance, result.duration),
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        // right: 30,
                                        // bottom: 300,
                                        // left: 30,
                                        // top: 100,
                                    },
                                });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />)}
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    <Image source={imagePath.greenIndicator} />
                </TouchableOpacity>
                {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text>Time left: {time.toFixed(0)} </Text>
                <Text>Distance left: {distance.toFixed(0)}</Text>
            </View>)}
            </View>
            {/* <View style={styles.bottomCard}>
                <Text>Where are you going..?</Text>
                <TouchableOpacity
                    onPress={onPressLocation}
                    style={styles.inpuStyle}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View> */}
            <Loader isLoading={isLoading} />
            </View>
        </View></SideMenu>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inpuStyle: {
       
        
        width: '90%',
        height:'30%',
       backgroundColor:'white',
        padding:0,
        margin:0,
        borderRadius: 10,
        marginTop: '7%'
    },rect2: {
        zIndex: 2,
        width: '100%',
        height: '25%',
       position:'absolute',
        // backgroundColor: "rgba(230,230, 230,1)",
        backgroundColor: "#fff",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
          width: 3,
          height: 3
        },
        elevation: 5,
        shadowOpacity: 0.09,
        shadowRadius: 0,
     flex:1,
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center'
        
      },image: {
        width: '30%',
        height: '35%',
      marginTop:'5%'
      }
});

export default Home;
