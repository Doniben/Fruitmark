import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";
// import Toast from 'react-native-toast-message'
import EasyButton from "../../Shared/StyledComponents/EasyButton";
//! import { connect } from 'react-redux'
//! import * as actions from '../../Redux/Actions/cartActions';

var { width } = Dimensions.get("window");

const FruitCard = (props) => {
  const { name, countInStock, image } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.countInStock}>{countInStock}</Text>
    </View>
  );
};

/* const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (pruit) => 
            dispatch(actions.addToCart({quantity: 1, pruit}))
    }
} */

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: width / 1.9,
    padding: 10,
    borderRadius: 10,
    marginTop: 45,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: 160,
    height: 160,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left"
  },
  countInStock: {
    fontSize: 25,
    color: "rgba(0,164,109,1)",
    marginTop: 10,
    fontWeight: "bold",
  },
});

//! export default connect(null, mapDispatchToProps)(FruitCard);

export default FruitCard;
