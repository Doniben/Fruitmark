import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Badge, Text } from "native-base";

const CityFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "rgba(0,164,109,0.01)" }}
    >
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.cityFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.cities.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.cityFilter(item._id),
                props.setActive(props.cities.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.cities.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: "white", fontSize: 17 }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  active: {
    backgroundColor: "#00a46c",
  },
  inactive: {
    backgroundColor: "#a1c2b7",
  },
});

export default CityFilter;
