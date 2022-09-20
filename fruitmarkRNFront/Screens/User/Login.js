import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { LinearGradient } from "expo-linear-gradient";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <>
    <SafeAreaView style={styles.header}>
        <View
          style={{
            backgroundColor: "#00a46c",
            height: "95%",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../../assets/menu-bars.png")}
            style={{
              height: 10,
              width: 20,
              marginTop: 50,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
              width: "100%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: 22,
                  color: "#FFF",
                  fontWeight: "bold",
                  marginTop: -30,
                  backgroundColor: "transparent",
                  zIndex: 20
                }}
              >
                Fruitmark
              </Text>
            </View>
            <View style={{ width: "51%", alignItems: "flex-end" }}>
              <Image
                source={require("../../assets/fm-logo.png")}
                style={{ height: 110, width: 140, bottom: 50, marginBottom: -70 }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={{backgroundColor: "rgba(0,164,109,0.1)"}}>
      <LinearGradient
          colors={["rgba(0,164,109,0.6)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 100,
            marginTop: 0,
            top: -50,
            zIndex: -10
          }}
        />
        <FormContainer title={"Login"}>
          <Input
            placeholder={"Enter Email"}
            name={"email"}
            id={"email"}
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
            placeholder={"Enter Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
            <EasyButton large primary onPress={() => handleSubmit()}>
              <Text style={{ color: "white" }}>Let's go!</Text>
            </EasyButton>
          </View>
        </FormContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "21%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: "rgba(0,164,109,0.1)",
    zIndex: 100,
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  center: {
    textAlign: "center",
    width: "10%",
    position: "absolute",
    top: 80,
    left: 160
  }
});

export default Login;
