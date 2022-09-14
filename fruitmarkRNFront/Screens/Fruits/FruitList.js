import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

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
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ height: 400 }}
        >
          <LinearGradient
            colors={["rgba(0,164,109,0.09)", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 100,
              marginTop: 200,
              top: 0,
            }}
          />
          <FruitCard {...item} />
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default FruitList;
