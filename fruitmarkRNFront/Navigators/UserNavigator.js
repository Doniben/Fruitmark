import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/User/Login";
// import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";
import AuthGlobal from "../Context/store/AuthGlobal";
import AdminNavigator from "./AdminNavigator";

const Stack = createStackNavigator();

function MyStack() {
  const context = useContext(AuthGlobal);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="User Profile"
        component={ context.stateUser.user.isAdmin == true ? AdminNavigator : UserProfile }
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
