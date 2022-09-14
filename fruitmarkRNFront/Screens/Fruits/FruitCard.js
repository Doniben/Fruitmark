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
        style={{height: 50, width: 50}}
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
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: 60,
    height: 60,
    /* backgroundColor: "transparent",
    position: "absolute",
    top: -45, */
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  countInStock: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});

//! export default connect(null, mapDispatchToProps)(FruitCard);

export default FruitCard;
