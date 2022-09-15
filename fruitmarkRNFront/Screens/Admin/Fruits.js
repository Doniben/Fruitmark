import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}></Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Fruit</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>City</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Stock</Text>
      </View>
    </View>
  );
};

const Fruits = (props) => {
  const [fruitList, setFruitList] = useState();
  const [fruitFilter, setFruitFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}fruits`).then((res) => {
        setFruitList(res.data);
        setFruitFilter(res.data);
        setLoading(false);
      });

      return () => {
        setFruitList();
        setFruitFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchFruit = (text) => {
    if (text == "") {
      setFruitFilter(fruitList);
    }
    setFruitFilter(
      fruitList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteFruit = (id) => {
    axios
      .delete(`${baseURL}fruits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const fruits = fruitFilter.filter((item) => item.id !== id);
        setFruitFilter(fruits);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Orders")}
        >
          <Icon name="shopping-bag" size={18} color="white" />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton> */}
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("FruitForm")}
          syle={{backgroundColor: "rgba(0,164,109,1)"}}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Fruits</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Cities")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Cities</Text>
        </EasyButton>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={fruitFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteFruit}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Fruits;
