import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Order"
import Fruits from "../Screens/Admin/Fruits"
import FruitForm from "../Screens/Admin/FruitForm"
import Cities from "../Screens/Admin/Cities"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Fruits"
                component={Fruits}
                options={{
                    title: "Fruits"
                }}
            />
            <Stack.Screen name="Cities" component={Cities} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="FruitForm" component={FruitForm} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}