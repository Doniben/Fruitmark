import React from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";

var { width } = Dimensions.get("window");

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -80,
    marginBottom: 400,
    width: width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    color: "rgba(0,164,109,1)"
  },
});

export default FormContainer;
