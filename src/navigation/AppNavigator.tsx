// Modules
import React from "react";
import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Components
import Home from "../screens/Home";
import About from "../screens/About";
import TableOfContents from "../screens/TableOfContents";
import Pet from "../screens/Pet";
import Module from "../screens/Module";
import Quiz from "../screens/Quiz";

const Stack = createNativeStackNavigator();

const AppNavigator = (data: any) => {
  return (
    <Box size="full" bg="black" safeAreaY>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ data: data?.data?.home }}
          />
          <Stack.Screen
            name="About"
            component={About}
            initialParams={{ data: data?.data?.about }}
          />
          <Stack.Screen
            name="TOC"
            component={TableOfContents}
            initialParams={{ data: data?.data?.modules }}
          />
          <Stack.Screen name="Pet" component={Pet} />
          <Stack.Screen name="Module" component={Module} />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default AppNavigator;
