import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
// import CartNavigator from "./CartNavigator";
// import UserNavigator from "./UserNavigator";
// import AdminNavigator from "./AdminNavigator";

// import CartIcon from "../Shared/CartIcon";
// import AuthGlobal from "../Context/store/AuthGlobal";t

const Tab = createBottomTabNavigator();

const Main = () => {
  //! const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarAactiveTintColor: "#e91e63",
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null
        ]
      }}
    >
    <Tab.Screen
      name="Fruitmark"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={30} />
        ),
        headerShown: false
      }}
    />
      
      



      {/* <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Main;
