import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Client, Databases, Query } from "appwrite";

export const config = {
    platform: 'com.lumen.orga',
    endpoint: process.env.EXPO_PUBLIC_APPWIRTE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

// Appwrite Client einrichten
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);


const database = new Databases(client);

export default function AdminScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchActiveUsers() {
      const response = await database.listDocuments("your_db_id", "attendances", [
        Query.isNull("ausgestempelt_am"),
      ]);
      setUsers(response.documents);
    }
    fetchActiveUsers();
  }, []);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Anwesende Helfer</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-lg">{item.user_id}</Text>
        )}
      />
    </View>
  );
}