import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FruitContainer from "../Screens/Fruits/FruitContainer";
import SingleFruit from "../Screens/Fruits/SingleFruit";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home-main"
        component={ FruitContainer }
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Fruit Detail"
        component={ SingleFruit }
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
