import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";

import FruitList from "./FruitList";
import CityFilter from "./CityFilter";

var { height } = Dimensions.get("window");

const FruitContainer = (props) => {
  const [fruits, setFruits] = useState([]);
  const [fruitsFiltered, setFruitsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [cities, setCities] = useState([]);
  const [fruitsCtg, setFruitsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Fruits
      axios
        .get(`${baseURL}fruits`)
        .then((res) => {
          setFruits(res.data);
          setFruitsFiltered(res.data);
          setFruitsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      // Cities
      axios
        .get(`${baseURL}cities`)
        .then((res) => {
          setCities(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setFruits([]);
        setFruitsFiltered([]);
        setFocus();
        setCities([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  // Cities
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setFruitsCtg(initialState), setActive(true)]
        : [
            setFruitsCtg(
              fruits.filter((i) => i.city.id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      <SafeAreaView style={styles.header}>
        <View
          style={{
            backgroundColor: "#00a46c",
            height: "95%",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../../assets/menu-bars.png")}
            style={{
              height: 10,
              width: 20,
              marginTop: 50,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
              width: "100%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: 22,
                  color: "#FFF",
                  fontWeight: "bold",
                  marginTop: -30,
                  backgroundColor: "transparent",
                }}
              >
                Fruitmark
              </Text>
            </View>
            <View style={{ width: "51%", alignItems: "flex-end" }}>
              <Image
                source={require("../../assets/fm-logo.png")}
                style={{ height: 110, width: 140, bottom: 50, marginBottom: -62 }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={{ display: "flex", alignItems: "center", backgroundColor: "rgba(0,164,109,0.1)" }}>
        <CityFilter
          cities={cities}
          cityFilter={changeCtg}
          fruitsCtg={fruitsCtg}
          active={active}
          setActive={setActive}
        />
      </View>
      <ScrollView>
        <LinearGradient
          colors={["rgba(0,164,109,0.5)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 100,
            marginTop: 0,
            top: -50,
          }}
        />
        <View>
          {fruitsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {fruitsCtg.map((item) => {
                // console.log(item._id)
                return (
                  <FruitList
                    navigation={props.navigation}
                    key={item._id}
                    item={item}
                    image={item.image}
                  />
                );
              })}
            </View>
          ) : (
            <View style={[styles.center, { height: height / 2 }]}>
              <Text>No fruits found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
  },
  header: {
    width: "100%",
    height: "21%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: "rgba(0,164,109,0.1)"
  },
  listContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "rgba(0,164,109, 0.1)",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FruitContainer;
