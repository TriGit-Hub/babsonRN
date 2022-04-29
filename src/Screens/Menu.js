import React, { Component } from "react";
import { StyleSheet, View,Text,Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Untitled1 = (props) => {
  const onPressLocation = () => {
    props.navigation.navigate('events')
}

  return( <View style={styles.container}>
    <TouchableOpacity><Text  style={styles.label}>Home</Text></TouchableOpacity>
    <TouchableOpacity onPress={onPressLocation}><Text  style={styles.label}>Events</Text></TouchableOpacity>
    <TouchableOpacity><Text  style={styles.label}>My Schedule</Text></TouchableOpacity>
    <TouchableOpacity><Text  style={styles.label}>Account</Text></TouchableOpacity>
    <TouchableOpacity><Text  style={styles.label}>Sign Out</Text></TouchableOpacity>
    <Image
        source={require("../assets/images/image_1.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
  </View>)
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,102,68,1)",
    borderTopRightRadius:50,
    borderBottomRightRadius:50,
    paddingTop:'45%',
    paddingLeft:'10%'
  },
  label: {
    fontSize:20,
    color:"#fff",
    fontWeight:"700",
    fontFamily:'Helvetica Neue',
    marginTop:20

  },
  image: {
    width: 128,
    height: 97,
   marginTop:'120%',
   marginLeft:'15%'
  }
});

export default Untitled1;