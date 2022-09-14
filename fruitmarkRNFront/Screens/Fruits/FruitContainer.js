import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";

import FruitList from "./FruitList";
import SearchedFruit from "./SearchedFruits";
import Banner from "../../Shared/Banner";
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

  // Fruit Methods
  const searchFruit = (text) => {
    setFruitsFiltered(
      fruits.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

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
          height: "80%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
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
              }}
            >
              Fruitmark
            </Text>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <Image
              source={require("../../assets/fm-logo.png")}
              style={{ height: 60, width: 60 }}
            />
          </View>
        </View>
      </View>
      <LinearGradient
        colors={["rgba(0,164,109,0.4)", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -45,
        }}
      >

      </LinearGradient>
    </SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Banner />
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <CityFilter
              cities={cities}
              cityFilter={changeCtg}
              fruitsCtg={fruitsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
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
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  header: {
    width: "100%",
    height: "28%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 0,
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FruitContainer;
