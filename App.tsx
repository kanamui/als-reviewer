import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";
import theme from "./src/themes/light";
import mock from "./mock/als.json";

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
