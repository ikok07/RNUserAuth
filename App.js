import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import {AuthProvider, useAuth} from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import {log} from "expo/build/devtools/logger";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage/src";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
    const {logout} = useAuth()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
              headerRight: ({tintColor}) => <IconButton icon="exit" color={tintColor} size={24} onPress={logout}/>
          }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
    const {isAuthenticated} = useAuth()

    return (
        <NavigationContainer>
            {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

function Root() {
    const {authenticate} = useAuth()
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    useEffect(() => {
        async function fetchToken() {
            const storageToken = await AsyncStorage.getItem("token")
            if (storageToken) authenticate(storageToken)
            setIsLoggingIn(false)
        }
        fetchToken()
    }, []);

    if (isLoggingIn) return <AppLoading />

    return <Navigation />
}

export default function App() {



  return (
    <AuthProvider>
        <StatusBar style="light" />
        <Root/>
    </AuthProvider>
  );
}
