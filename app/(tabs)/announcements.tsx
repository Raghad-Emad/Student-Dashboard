import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
  StyleSheet,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { fetchAnnouncements } from "../../services/announcementService";
import AnnouncementCard from "../../components/AnnouncementCard";
import { useTranslation } from "react-i18next";

export default function AnnouncementsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const a = await fetchAnnouncements();
    setAnnouncements(a);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.heading}>{t("announcements")}</Text>

      {announcements.length === 0 ? (
        <Text style={styles.empty}>{t("noAnnouncements")}</Text>
      ) : (
        announcements.map((item: any) => (
          <AnnouncementCard
            key={item._id}
            _id={item._id}
            title={item.title}
            content={item.content}
            onDeleted={loadData}
          />
        ))
      )}

      <View style={styles.btnRow}>
        <Pressable
          onPress={() => router.push("/add-announcement")}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.buttonText}>{t("addAnnouncement")}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#222",
  },
  empty: {
    color: "#666",
    fontStyle: "italic",
    marginBottom: 12,
  },
  btnRow: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#0057b7",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
