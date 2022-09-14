import React from "react";
import { TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import FruitCard from "./FruitCard";

var { width } = Dimensions.get("window");

const FruitList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() =>
        props.navigation.navigate("Fruit Detail", { item: item })
      }
    >
      <View style={{ width: width }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
        >
          <FruitCard {...item} />
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default FruitList;
