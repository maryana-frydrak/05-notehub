import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (page = 1, perPage = 10) => {
  const res = await axios.get(`${BASE_URL}/notes`, {
    params: { page, perPage },
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return res.data;
};
