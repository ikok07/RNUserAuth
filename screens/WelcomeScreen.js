import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../store/auth-context";

function WelcomeScreen() {
  const {token} = useAuth()
const [message, setMessage] = useState("")

  useEffect(() => {
    axios.get(
        `https://rnauth-928e7-default-rtdb.europe-west1.firebasedatabase.app/test/test/message.json?auth=${token}`
    ).then(res => setMessage(res.data))
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>Protected message: {message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
