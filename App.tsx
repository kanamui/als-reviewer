import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import * as ScreenOrientation from "expo-screen-orientation";
import AppNavigator from "./src/navigation/AppNavigator";
import theme from "./src/themes/light";
import mock from "./mock/als.json";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const App = () => {
  const data = JSON.parse(JSON.stringify(mock)) || {};

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    changeScreenOrientation();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator data={data} />
    </NativeBaseProvider>
  );
};

export default App;
