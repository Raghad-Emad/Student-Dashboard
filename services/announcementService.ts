import axios from "axios";
import { BASE_URL } from "../constants/api";

export const fetchAnnouncements = async () => {
  const res = await axios.get(`${BASE_URL}/announcements`);
  return res.data;
};

export const createAnnouncement = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/announcements`, data);
  return res.data;
};

export const updateAnnouncement = async (id: string, data: any) => {
  const res = await axios.put(`${BASE_URL}/announcements/${id}`, data);
  return res.data;
};

export const deleteAnnouncement = async (id: string) => {
  await axios.delete(`${BASE_URL}/announcements/${id}`);
};
