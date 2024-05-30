import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage/src/index";

const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
})

export function AuthProvider({children}) {
    const [authToken, setAuthToken] = useState(null)

    function authenticate(token) {
        setAuthToken(token)
        AsyncStorage.setItem("token", token)
    }

    function logout() {
        setAuthToken(null)
        AsyncStorage.removeItem("token")
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        console.log(new Error("The component needs to be inside AuthProvider in order to use useAuth!"))
        return
    }
    return context
}