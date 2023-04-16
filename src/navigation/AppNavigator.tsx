import React from "react";
import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mock from "../../mock/als.json";
import Home from "../screens/Home";
import About from "../screens/About";
import ModuleTOC from "../screens/ModuleTOC";
import Module from "../screens/Module";
import Quiz from "../screens/Quiz";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const data = JSON.parse(JSON.stringify(mock)) || [];

  return (
    <Box size="full" bg="black" safeAreaY>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} initialParams={{ data: data?.home }} />
          <Stack.Screen name="About" component={About} initialParams={{ data: data?.about }}  />
          <Stack.Screen name="ModuleTOC" component={ModuleTOC} initialParams={{ data: data?.modules }}  />
          <Stack.Screen name="Module" component={Module} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default AppNavigator;
