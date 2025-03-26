import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Button, Alert } from "react-native";
import { deleteUser, getUsers } from "../../services/userService";

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(userId);
      Alert.alert("Success", "User deleted successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate("EditUser", { userId: item.$id })}
      />
      <Button title="Delete" onPress={() => handleDeleteUser(item.$id)} />
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Button title="Add New User" onPress={() => navigation.navigate("CreateUser")} />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
        />
      )}
    </View>
  );
};

export default UserListScreen;