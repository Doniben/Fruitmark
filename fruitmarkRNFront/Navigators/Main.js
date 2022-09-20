import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
// import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

// import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

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
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Fruitmark"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="home" color={"rgba(0,164,109,1)"} size={30} />
          ),
          headerShown: false,
        }}
      />

      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: () => (
              <Icon name="cog" color={"rgba(0,164,109,1)"} size={30} />
            ),
            headerShown: false,
          }}
        />
      ) : null}

      <Tab.Screen
        name="Us"
        component={UserNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="user" color={"rgba(0,164,109,1)"} size={30} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
