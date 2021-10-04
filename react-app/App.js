import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';


import { StyleSheet, 
  Text, 
  View,Image, 
  TextInput, 
  Button,
  TouchableOpacity, 
  Alert,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,

} from 'react-native';
import { set } from 'react-native-reanimated';


export default function App() {
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomeScreen}/>
        <Stack.Screen name = "Login" component = {LoginScreen}/>
        <Stack.Screen name = "Register" component = {RegisterScreen}/>
        <Stack.Screen name = "Preference" component = {PreferenceScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

const dataSource = [
  {
    url: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Football',
  },
  {
    url: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Tennis',
  },
  {
    url: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Hockey',
  },
];



const PreferenceScreen = () =>{

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1)
      };
    });
    setDataSource(items);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1
            }}>
            <Image
              style={styles.imageThumbnail}
              source={{uri: item.src}}
            />
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const Category = (props) => {
  return (
    <View style={styles.card}>
      <Text> {props.name}!</Text>
    </View>
  );
}
const HomeScreen = ({navigation}) =>{
  return (
    <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
      <Text> Home Screen</Text>
      <Button
        title="Go to login screen"
        onPress={() => navigation.navigate('Login')}  
      />
     <Button
        title="Go to Register screen"
        onPress={() => navigation.navigate('Register')}  
      />
    </View>
  );
};

const RegisterScreen = ({navigation},windowHeight) =>{
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset = {1000}
    style={styles.container}
    > 
        <Image style = {styles.image} source = {require("./Assets/Tucan.png")}/>      
        <View style = {styles.inputView}>
        
          <TextInput
            style={styles.TextInput}
            placeholder= "Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>   
        
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)} />
          
          </View>
      
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Preference')}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>   
        

    </KeyboardAvoidingView>
    
  );
};
//    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

const LoginScreen = () =>{
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  return (
    

    
     <View style={styles.container}>
     
        <Image style={styles.image} source={require("./Assets/Tucan.png")} />

    
        <View style={styles.texterView}>

          <Text style = {styles.text}> Email</Text>
        </View>
 

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
         />
      </View>

      <View style={styles.texterView}>

      <Text style = {styles.text}> Password</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} />
      </View>

      <TouchableOpacity style={{ height: 15, 
        marginTop: 10,borderColor:"black",borderBottomWidth:1, 
        }}
        onPress = {() => Alert.alert("Forgot Password")}
        >
        <Text>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>

      </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90ee90',
    padding:20,
    justifyContent:"center",
    alignItems:"center"
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  container1: {
    flex: 1,
    backgroundColor: 'grey',
    padding:20,
    justifyContent:"center",
    alignItems:"center"
  },
  container2: {
    flex: 10,
    backgroundColor: '#90ee90',
    padding:20,
    justifyContent:"center",
    alignItems:"center"
  },
  card:{
    flexDirection:"row",
    padding:20 

  },
  preference:{
    flex: 1,
    backgroundColor:"grey",
    padding:5,
    borderRadius:10
  },

  texterView: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius:25,
    elevation:3,
    backgroundColor: "white"
  },
  text:{
    fontSize:16,
    lineHeight:21,
    fontWeight:"bold",
    letterSpacing: 0.25,
    color:"white",
  },

  image :{
    marginBottom: 40,

  },
  inputView: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
    borderBottomWidth:1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  
  TextInput: {
    flex: 1,
    marginTop: Platform.OS = "ios" ? 0: -12,
    color: "#05375a",
    paddingLeft:0,
    marginLeft: 20,
  },
  forgot_button: {
    
    height: 30,
    marginBottom: 30,
  },
  forgot_view: {
    borderBottomWidth: 1,
    paddingTop:10,
  },
  loginBtn:
 {
   width:"90%",
   borderRadius: 5,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:40,
   backgroundColor:"#006400",
 }
});
