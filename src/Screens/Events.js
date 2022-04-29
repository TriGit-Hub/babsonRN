import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Untitled2(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.fechaDelDiaDeHoy}>Fecha del dia de hoy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fechaDelDiaDeHoy: {
    fontFamily: "helvetica-regular",
    color: "#121212",
    height: 50,
    width: 282,
    textAlign: "center",
    fontSize: 21,
    marginTop: 103,
    alignSelf: "center"
  }
});

export default Untitled2;
