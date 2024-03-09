import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 36 }}>Earnest Mobile App</Text>
      <Text style={{ fontSize: 20, marginTop: 20 }}>
        Not Available Anywhere
      </Text>
      <Link href="/leaders" asChild={true}>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 10,
            marginTop: 50,
            borderRadius: 18,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Meet Our Leaders</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/talk" asChild={true}>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 10,
            marginTop: 30,
            borderRadius: 18,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Talk To Us</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Index;
