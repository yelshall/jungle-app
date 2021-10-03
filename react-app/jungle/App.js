import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Button} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import eventsData from './assets/events-data/eventsData';
import Card from './src/components/EventCard';

export default function App() {
  const [index, updateIndex] = useState(0);

  const clickHandler = () => {
    updateIndex(index+1);
  }
  const clickHandlerdislike = () => {
    updateIndex(index-1);
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Card eventData={eventsData[index]}/>
      <SafeAreaView style={styles.buttonContainer}> 
      <Button
        title="SWIPE RIGHT"
        color="white"
        onPress={(clickHandler)}
      />
       </SafeAreaView>

      <SafeAreaView style={styles.buttonContainer}> 
      <Button
        title="SWIPE LEFT"
        color="white"
        onPress={(clickHandlerdislike)}
      />
      </SafeAreaView>
    </SafeAreaView>
    
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonContainer: {
    //alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'black',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },

});

