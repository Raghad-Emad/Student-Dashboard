import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../store/authSlice";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = () => {
    dispatch(toggleLogin());
    router.replace("/(tabs)" as any);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.jpg")}
        style={styles.logo}
      />

      <Text style={styles.title}>{t("appTitle")}</Text>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f6ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 24,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 36,
  },
  button: {
    backgroundColor: "#0057b7",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
