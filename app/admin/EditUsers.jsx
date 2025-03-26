import React, { useState, useEffect } from "react";
import { Text, TextInput, Button, StyleSheet, View, Alert } from "react-native";
import { updateUser } from "../../services/userService";

const EditUserScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data by userId and populate form
    // Here you should fetch data using userId (e.g., getUserDetailsById)
    // For simplicity, we'll assume email and name are fetched.
    setEmail("user@example.com");
    setName("User Name");
  }, [userId]);

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      await updateUser(userId, email, name);
      Alert.alert("Success", "User updated successfully");
      navigation.goBack(); // Go back to the user list
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Button
        title={loading ? "Updating..." : "Update User"}
        onPress={handleUpdateUser}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditUserScreen;