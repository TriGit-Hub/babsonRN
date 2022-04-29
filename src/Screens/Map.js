import React from 'react';

import { StyleSheet, View, Image,Text,TextInput } from "react-native";
import Home from './Home'
import ChooseLocation from './ChooseLocation';
import { Overlay } from 'react-native-maps';
// import CupertinoSearchBarBasic1 from "../components/CupertinoSearchBarBasic1";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect2}>
          <Image
            source={require("../assets/images/logo-babsontrans.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <TextInput></TextInput>
       {/* <ChooseLocation style={styles.image2}></ChooseLocation> */}
          {/* <CupertinoSearchBarBasic1
            style={styles.cupertinoSearchBarBasic1}
          ></CupertinoSearchBarBasic1> */}
        </View>
        {/* <View style={styles.rect}><Home></Home></View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  rect: {

    width: '100%',
    height: '70%',
    
    backgroundColor: "rgba(230,230, 230,0.93)",
    opacity: 0.98
  },
  rect2: {
 
    width: '100%',
    height: '100%',
  
    backgroundColor: "rgba(230,230, 230,1)",
    borderRadius: 50,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.09,
    shadowRadius: 0,

    flexDirection:'column',
    alignContent:'center',
    alignItems:'center'
    
  },
  image: {
    width: 130,
    height: 73,
  marginTop:'5%'
  }, image2: {
    width: 710,
    height: 53,

  },
  cupertinoSearchBarBasic1: {
    height: 44,
    width: 344,
    marginTop: 21,
    marginLeft: 16
  },
  rectStack: {
    width: '100%',
    height: '100%'
  }
});

export default Untitled;