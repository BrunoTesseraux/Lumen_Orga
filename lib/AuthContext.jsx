import { Account } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {account} from "./../lib/appwrite"
import { Text } from "react-native";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        checkAuth();
    }

    const checkAuth = async () => {
        try{
            const responseSession = await account.getSession("current")
            setSession(responseSession);

            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    const signin = async (email, password) => {
        console.log(email, password);
        setLoading(true);
        try {
            console.log("hallo 2");
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.error("Signin failed:", error);
            throw error;
        } finally {
            setLoading(false); // Stellt sicher, dass `loading` immer zurückgesetzt wird
        }
    };
    const signout = async () => {
        setLoading(true);
        account.deleteSession("current");
        setSession(null);
        setUser(null);
        setLoading(false);
    };

    const contextData = {session, user, signin, signout};
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView>
                    <Text>Loading...</Text>
                </SafeAreaView>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };
