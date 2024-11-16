import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommunicationController from './model/CommunicationController';
import DBController from './model/DBController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


export default function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkFirstLunch = async () => {
      try {

        const storedSid = await AsyncStorage.getItem('sid');

        if (storedSid) {
          setMessage("Secondo avvio, sid letto da disco");
          console.log("Sid letto da disco: ", storedSid);
        } else {
          // Primo avvio dell'app
          console.log("Primo avvio dell'app");
          const sid = await CommunicationController.register();

          // Salvo il sid in AsyncStorage
          if (sid){
            await DBController.registerUser(sid);
            setMessage("Primo avvio, sid salvato in disco");
            console.log("Sid salvato in disco: ", sid);
          } else {
            setMessage("Errore durante la registrazione");
          }
        }
      } catch (error) {
        console.log("Error in checkFirstLunch: ", error);
      }
    };

    checkFirstLunch();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <StatusBar style="auto" />
    </View>
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
