import axios from "axios";
import type { Note } from "../types/note";
import type { NotesResponse } from "../types/api";

const BASE_URL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page = 1,
  perPage = 10,
  tag: string | null = null,
  search: string = "",
) => {
  const res = await axios.get<NotesResponse>(`${BASE_URL}/notes`, {
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

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
) => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return res.data;
};
