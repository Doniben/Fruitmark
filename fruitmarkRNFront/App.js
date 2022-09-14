import { StyleSheet, LogBox } from 'react-native';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, extendTheme }  from 'native-base';
//! import Toast from "react-native-toast-message";

	// Navigatiors
  import Main from "./Navigators/Main";

  // Screens
  // import Header from "./Shared/Header";
  
  LogBox.ignoreAllLogs(true);

/*   const newColorTheme =  {
    brand: {
      900: '#5B8DF6',
      800: '#ffffff',
      700: '#cccccc'
    }
  };

  const newColor = () => {

  }

const theme = extendTheme({
  colors: newColorTheme,
}); */

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* <Header /> */}
        <Main />
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
