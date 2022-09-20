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
import RNPickerSelect from "react-native-picker-select";
import SelectDropdown from 'react-native-select-dropdown'

const FruitForm = (props) => {
  const cities = ["Marseille", "Paris", "Dijon", "Nice", "Lille"]
  const fruits = ["Orange", "Banana", "Apple", "Srawberry", "Cherry"]
  const [value, setValue] = useState()
  /* const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [srcItem, setSrcItem] = useState();
  const [desItem, setDesItem] = useState();
  const [itemId, setItemId] = useState() */

/*   useEffect(() => {
    if (!props.route.params) {
      setSrcItem(null);
      setDesItem(null);
    } else {
      setSrcItem(props.route.params.item);
      setDesItem(props.route.params.item);
      setName(props.route.params.item.name);
      setImage(props.route.params.item.image);
      setCity(props.route.params.item.city._id);
      setItemId(props.route.params.item._id);
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

    // Fruits
    axios
      .get(`${baseURL}fruits`)
      .then((res) => setItem(res.data))
      .catch((error) => alert("Error to load fruits"));

    return () => {
      setCities([]);
      setItem([]);
    };
  }, []); */

  const sendFruit = () => {
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Fruits successfully sent",
      text2: "",
    });
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Fruits successfully sent",
      text2: "",
    });
    props.navigation.navigate("Fruits")
    /* if (
      srcName == "" ||
      SrcCity == "" ||
      desName == "" ||
      desCity == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formDataSrc = new FormData();

    const image = itemSrc.image;

    formDataSrc.append("image", image);
    formDataSrc.append("name", name);
    formDataSrc.append("city", city);
    formDataSrc.append("countInStock", countInStock - pickerValue);

    let formDataDes = new FormData();

    const imageDes = itemDes.image;

    formDataDes.append("image", imageDes);
    formDataDes.append("name", name);
    formDataDes.append("city", city);
    formDataDes.append("countInStock", countInStock + pickerValue);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (itemSrc !== null) {
      axios
        .put(`${baseURL}fruits/${item.id}`, formDataSrc, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Fruits successfuly sended",
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
    if (itemSrc !== null) {
      axios
        .put(`${baseURL}fruits/${item.id}`, formDataDes, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Fruits successfuly received",
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
    } */
  }

  return (
      <View style={styles.container}>
        <Text style={styles.span}>Send from:</Text>
        {/* <RNPickerSelect
          value ={srcItem.city.name}
          onValueChange={(value) => {
            setCity({ ...srcItem, src: value });
          }}
          items={[
            {...cities.map((c) => {
              return `{ label: ${c.name}, value: ${c._id} }`
            
            })}
          ]}
        /> */}
        <SelectDropdown
          data={cities}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        
        <Text style={styles.span}>Send to:</Text>
        {/* <RNPickerSelect
          value ={desItem.city.name}
          onValueChange={(value) => {
            setCity({ ...desItem, src: value });
          }}
          items={[
            {...cities.map((c) => {
              return `{ label: ${c.name}, value: ${c._id} }`
            
            })}
          ]}
        /> */}
        <SelectDropdown
          data={cities}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <Text style={styles.span}>Fruit to send:</Text>
{/*         <RNPickerSelect
          value ="Cherry"
          onValueChange={(value) => {
            setCity({ ...name, src: value });
          }}
          items={[
            {...fruit.map((f) => {
              return `{ label: ${f.name}, value: ${f._id} },`
            
            })}
          ]}
        /> */}
        <SelectDropdown
          data={fruits}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <View style={styles.label}>
          <Text style={styles.span}>Count to send</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          /* value={pickerValue} */
          value={value}
          keyboardType={"numeric"}
          onChangeText={(num) => setValue(num)}
          /* onChangeText={(num) => setPickerValue(num)} */
        />
        <View style={styles.buttonContainer}>
          <EasyButton large primary onPress={() => sendFruit()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton> 
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "100%",
    marginTop: 10,
  },
  span: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: "bold",
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
  container: {
    width: '100%',
    height: '90%',
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 10,
    backgroundColor: "rgba(0,164,109,0.1)"
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