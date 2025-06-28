import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { deleteAnnouncement } from "../services/announcementService";
import { useTranslation } from "react-i18next";

export default function AnnouncementCard({
  _id,
  title,
  content,
  onDeleted,
}: {
  _id: string;
  title: string;
  content: string;
  onDeleted: () => void;
}) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await deleteAnnouncement(_id);
    onDeleted();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.btnRow}>
        <Pressable
          style={[styles.button, styles.editBtn]}
          onPress={() =>
            router.push({
              pathname: "/edit-announcement",
              params: { id: _id, title, content },
            })
          }
        >
          <Text style={styles.buttonText}>{t("edit")}</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteBtn]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>{t("delete")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#f9fafe",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
    color: "#222",
  },
  content: {
    color: "#444",
    marginBottom: 12,
    fontSize: 14,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  editBtn: {
    backgroundColor: "#007bff",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
