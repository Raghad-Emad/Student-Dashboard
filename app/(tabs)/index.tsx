import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../../store/authSlice";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../../components/LanguageToggle";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("appTitle")}</Text>

      <Image
        source={require("../../assets/images/logo.jpg")}
        style={styles.logo}
      />
      <LanguageToggle />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.7 },
          styles.logout,
        ]}
        onPress={() => {
          dispatch(toggleLogin());
          router.replace("/login");
        }}
      >
        <Text style={styles.buttonText}>{t("logout")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafe",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
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
  button: {
    backgroundColor: "#0057b7",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logout: {
    backgroundColor: "#dd3c4c",
  },
});
