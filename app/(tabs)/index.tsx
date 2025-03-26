import { useAuth } from "@/lib/AuthContext";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const {signout, user} = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-red-500 font-poppins-bold">Lumen</Text>
      <Text className="text-2xl text-red-500 font-poppins-bold">Hallo {user?.name}!</Text>
      <TouchableOpacity className="p-3 bg-alert rounded-full" onPress={signout}>
        <Text className="text-green-100 font-poppins-bold">Logout</Text>
      </TouchableOpacity>
      <Link href="/admin/ListUsers">
        <Text className="text-red-500 font-poppins-bold">Admin</Text>
      </Link>
    </View>
  );
}
