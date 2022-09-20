import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <EasyButton primary medium onPress={() => props.delete(props.item._id)}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </EasyButton>
    </View>
  );
};

const Cities = (props) => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}cities`)
      .then((res) => setCities(res.data))
      .catch((error) => alert("Error to load cities"));

    return () => {
      setCities();
      setToken();
    };
  }, []);

  const addCity = () => {
    const city = {
      name: cityName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}cities`, city, config)
      .then((res) => setCities([...cities, res.data]))
      .catch((error) => alert("Error to load cities"));

    setCityName("");
  };

  const deleteCity = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}cities/${id}`, config)
      .then((res) => {
        const newCities = cities.filter((item) => item.id !== id);
        setCities(newCities);
      })
      .catch((error) => alert("Error to load cities"));
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={cities}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} delete={deleteCity} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text>Add City</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={cityName}
            style={styles.input}
            onChangeText={(text) => setCityName(text)}
          />
        </View>
        <View>
          <EasyButton medium primary onPress={() => addCity()}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});

export default Cities;
