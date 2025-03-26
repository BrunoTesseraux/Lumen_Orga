import { SplashScreen, Stack } from "expo-router";
import {useFonts} from "expo-font"
import "./globals.css"
import { useEffect } from "react";
import {AuthProvider} from "./../lib/AuthContext";


export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "poppins": require("../assets/fonts/Poppins.ttf"), 
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-extrabold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extralight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "poppins-light": require("../assets/fonts/Poppins-Light.ttf"),
    "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "poppins-thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "rubik": require("../assets/fonts/Rubik.ttf") 
  });

  useEffect(() => {
    console.log("Fonts loaded:", fontsLoaded);
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  return <AuthProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </AuthProvider>;
  
}
