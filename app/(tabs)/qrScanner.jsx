import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import {registerTimeEntry} from "../../lib/appwrite"

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null); // To store the scanned barcode data

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
  
      try {
        // Fetch user details based on QR ID
        // const user = await getUsersById(data);

        // if (user) {
          // console.log(`User Found: ${user.name}`);
  
          // Register time entry for user
          await registerTimeEntry(data);
  
          // Update state with user info
          setScannedData({ type, data});
  
          // Display success message
          // Alert.alert("Success", `${user.name} has been checked in/out.`);
        // } else {
          // Alert.alert("Error", "User not found.");
        // }
      } catch (error) {
        console.error("Error scanning user:", error);
        Alert.alert("Error", "Failed to process QR code.");
      }
    }
  };

  const handleScanAgain = () => {
    setScanned(false); // Reset scanned state to allow new scan
    setScannedData(null); // Clear the displayed data
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {scanned && (
        <View style={styles.scannedInfo}>
          <Text>Barcode Scanned!</Text>
          <Text>Type: {scannedData?.type}</Text>
          <Text>Data: {scannedData?.data}</Text>
          <Button title={"Tap to Scan Again"} onPress={handleScanAgain} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Center the content
  },
  scannedInfo: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
  },
});