import axios from "axios";
import {Alert} from "react-native";

const API_KEY= "AIzaSyBvCOIeefk-ehtuREdqXDd7teOr2VIW-2E"

export async function authenticateUser(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    try {
        const {data} = await axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        return data
    } catch(err) {
        Alert.alert("Authentication failed!", "Could not log you in. Please check your credentials or try again later!")
    }
}