import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

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
                    title: "Fruitmark Admin",
                }}
            />
            <Stack.Screen name="Cities" component={Cities} />
            <Stack.Screen name="FruitForm" 
                component={FruitForm} 
                options={{
                    title: "Send fruits",
                }}/>
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}