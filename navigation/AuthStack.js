import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Splash from "../screens/Splash"
import Onboarding from "../screens/Onboarding"
const Stack = createStackNavigator()
function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Onboarding"
        >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="splash" component={Splash} />
        </Stack.Navigator>
    )
}

export default AuthStack
