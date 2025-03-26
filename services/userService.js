import { Client, Account, Databases } from "appwrite";

export const config = {
  platform: 'com.lumen.orga',
  endpoint: process.env.EXPO_PUBLIC_APPWIRTE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

const client = new Client()
.setEndpoint(config.endpoint)
.setProject(config.projectId);


const account = new Account(client);
const users = new Databases(client);

// Function to create a new user
export const createUser = async (email, password, name) => {
  try {
    const response = await account.create(email, password, name);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get the list of users
export const getUsers = async () => {
  try {
    console.log("hallo")
    const response = await account.list();
    return response.users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update user
export const updateUser = async (userId, email, name) => {
  try {
    const response = await account.update(userId, email, name);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to delete user
export const deleteUser = async (userId) => {
  try {
    const response = await account.delete(userId);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};