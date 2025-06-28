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
import { fetchQuizzes } from "../../services/quizService";
import QuizCard from "../../components/QuizCard";
import { useTranslation } from "react-i18next";

export default function QuizzesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const q = await fetchQuizzes();
    setQuizzes(q);
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
      <Text style={styles.heading}>{t("quizSection")}</Text>

      {quizzes.length === 0 ? (
        <Text style={styles.empty}>{t("noQuizzes")}</Text>
      ) : (
        quizzes.map((quiz: any) => (
          <QuizCard
            key={quiz._id}
            _id={quiz._id}
            name={quiz.name}
            totalQuestions={quiz.totalQuestions}
            onDeleted={loadData}
          />
        ))
      )}

      <View style={styles.btnRow}>
        <Pressable
          onPress={() => router.push("/add-quiz")}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.buttonText}>{t("addQuiz")}</Text>
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
