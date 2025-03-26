import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg"; 
import { useAuth } from "../../lib/AuthContext"; 

export default function ProfileScreen() {
  const { user, loading } = useAuth(); 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>User not logged in</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Welcome, {user.name}!</Text>
      <Text className="text-lg">Your QR Code:</Text>
      <QRCode value={user.$id} size={200} />
    </View>
  );
}