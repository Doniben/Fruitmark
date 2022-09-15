import { StyleSheet, LogBox } from 'react-native';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, extendTheme }  from 'native-base';
import Toast from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

	// Navigatiors
  import Main from "./Navigators/Main";
  
  LogBox.ignoreAllLogs(true);


export default function App() {
  return (
    <Auth>
      <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </NativeBaseProvider>
      </Provider>
    </Auth>
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
