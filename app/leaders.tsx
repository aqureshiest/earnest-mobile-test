import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";

// get screen dimensions
const { width, height } = Dimensions.get("window");

const Leaders = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitle: "Leaders 1",
        }}
      />

      <View style={{ marginBottom: 80 }}>
        <Text style={{ fontSize: 36, textAlign: "center", marginTop: 20 }}>
          The CEO
        </Text>
        <Image
          source={require("@/assets/images/ceo.jpeg")}
          style={{
            height: height / 2,
            width: width,
            marginTop: 20,
          }}
        />

        <Text style={{ fontSize: 36, textAlign: "center", marginTop: 20 }}>
          The CTO
        </Text>
        <Image
          source={require("@/assets/images/cto.jpeg")}
          style={{
            height: height / 2,
            width: width,
            marginTop: 20,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Leaders;
