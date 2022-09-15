import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Item, Picker } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const FruitForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [mainImage, setMainImage] = useState();
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setMainImage(props.route.params.item.image);
      setCity(props.route.params.item.city._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Cities
    axios
      .get(`${baseURL}cities`)
      .then((res) => setCities(res.data))
      .catch((error) => alert("Error to load cities"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCities([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
    }
  };

  const addFruit = () => {
    if (
      name == "" ||
      city == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", name);
    formData.append("city", city);
    formData.append("countInStock", countInStock);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}fruits/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Fruit successfuly updated",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Fruits");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${baseURL}fruits`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Fruit added",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Fruits");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  return (
    <FormContainer title="Add Fruit" style={{ height: "100%" }}>
      <View style={styles.imageContainer}>
        <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
        </View>
        <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
      </View>
      <Input
        placeholder="Stock"
        name="stock"
        id="stock"
        value={countInStock}
        keyboardType={"numeric"}
        onChangeText={(text) => setCountInStock(text)}
      />
      {/* <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Select your City"
          selectedValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setPickerValue(e), setCity(e)]}
        >
          {cities.map((c) => {
            return <Picker.Item key={c._id} label={c.name} value={c._id} />;
          })}
        </Picker>
      </Item> */}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addFruit()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton> 
      </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default FruitForm;
