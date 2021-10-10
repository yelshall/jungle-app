import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Alert } from "react-native";
import styles from "../../styles";
// import {styles} from "../Components/styles";

class Preferences extends Component {
  // preferenceItems = ({item,index}) =>{
  //     return(
  //         <View style={styles.container}>
  //             <Text>items</Text>
  //         </View>
  //     );
  // }

  constructor(props) {
    super(props);
    this.GetGridViewItem = this.GetGridViewItem.bind(this);
    this.state = {
      GridListItems: [
        {
          name: "Hocname",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Football",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Dance",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Debate",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Classical music",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Java",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Photography",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Bowling",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Fishing",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Scating",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Play write",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Hunting",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Shooting",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Valorin",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Skiing",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Hacking",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Modeling",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Tennis",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Public speaking",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Singing",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Photography",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Bowling",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Fishing",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Scating",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Play write",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Hunting",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Shooting",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Valorin",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
        {
          name: "Skiing",
          unselectedColor: "#C8EE90",
          selectedColor: "grey",
          isSelected: false,
        },
      ],
    };
  }

  GetGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.containerP}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
            letterSpacing: 2,
            paddingBottom: 10,
          }}
        >
          Pick 5 or more intrests
        </Text>
        <FlatList
          data={this.state.GridListItems}
          renderItem={({ item }) => (
            <View style={styles.GridViewContainer}>
              <Text
                style={styles.GridViewTextLayout}
                onPress={this.GetGridViewItem.bind(this, item.name)}
              >
                {" "}
                {item.name}{" "}
              </Text>
            </View>
          )}
          numColumns={3}
        />
      </View>
    );
  }
}
export default Preferences;
// const PreferenceScreen = () =>{

//     const [dataSource, setDataSource] = useState([]);

//     useEffect(() => {
//       let items = Array.apply(null, Array(60)).map((v, i) => {
//         return {
//           id: i,
//           src: 'http://placehold.it/200x200?text=' + (i + 1)
//         };
//       });
//       setDataSource(items);
//     }, []);

//     return (
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           data={dataSource}
//           renderItem={({item}) => (
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'column',
//                 margin: 1
//               }}>
//               <Image
//                 style={styles.imageThumbnail}
//                 source={{uri: item.src}}
//               />
//             </View>
//           )}
//           //Setting the number of column
//           numColumns={3}
//           nameExtractor={(item, index) => index}
//         />
//       </SafeAreaView>
//     );
//   };

//   const Category = (props) => {
//     return (
//       <View style={styles.card}>
//         <Text> {props.name}!</Text>
//       </View>
//     );
//   }
