import { View, Pressable, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={toggleLanguage}>
        <Text style={styles.buttonText}>
          {isArabic ? "English" : "العربية"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#007bff",
    borderWidth: 2,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "600",
  },
});
