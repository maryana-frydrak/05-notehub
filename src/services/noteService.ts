import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page = 1,
  perPage = 10,
  tag: string | null = null,
  search: string = "",
) => {
  const res = await axios.get(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage,
      tag: tag || undefined,
      search: search || undefined,
    },
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await axios.post(`${BASE_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return res.data;
};
