import { Account, Client, Databases, Query, User } from "appwrite";
import { Linking } from "react-native";

export const config = {
    platform: 'com.lumen.orga',
    endpoint: process.env.EXPO_PUBLIC_APPWIRTE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

// Appwrite Client einrichten
const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!);


const database = new Databases(client);
export const account = new Account(client);

export async function getUserById(userId) {
  try {
    // Fetch user by ID using the Users API
    const user = await users.get(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('User not found');
  }
}


export async function registerTimeEntry(userId: string) {
  const lastEntry = await database.listDocuments("67e2fe3e003580b66963", "67e30076000aa2b6eb78", [
    Query.equal("userId", userId),
    Query.isNull("clock_in"),
    Query.orderDesc("clock_out"),
    Query.limit(1),
  ]);

  if (lastEntry.total > 0) {
    // Nutzer war eingestempelt → jetzt ausstempeln
    const entryId = lastEntry.documents[0].$id;
    return await database.updateDocument("67e2fe3e003580b66963", "67e30076000aa2b6eb78", entryId, {
      "clock_out": new Date().toISOString(),
    });
  } else {
    // Neuer Check-in Eintrag
    return await database.createDocument("67e2fe3e003580b66963", "67e30076000aa2b6eb78", "unique()", {
      "userId": userId,
      "clock_in": new Date().toISOString(),
      "clock_out": null,
    });
  }
}
