import axios from "axios";
import { BASE_URL } from "../constants/api";

export const fetchQuizzes = async () => {
  const res = await axios.get(`${BASE_URL}/quizzes`);
  return res.data;
};

export const createQuiz = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/quizzes`, data);
  return res.data;
};

export const updateQuiz = async (id: string, data: any) => {
  const res = await axios.put(`${BASE_URL}/quizzes/${id}`, data);
  return res.data;
};

export const deleteQuiz = async (id: string) => {
  await axios.delete(`${BASE_URL}/quizzes/${id}`);
};
