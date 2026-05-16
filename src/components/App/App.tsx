import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchNotes, deleteNote, createNote } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { NotesResponse } from "../../types/note";
import { useDebouncedCallback } from "use-debounce";
import { SearchBox } from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", page, filter, search],
    queryFn: () => fetchNotes(page, 10, filter, search),
  });

  const totalPages = data?.totalPages || 0;
  const handlePageChange = (e: { selected: number }) => {
    setPage(e.selected + 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const notes = data?.notes || [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <div className={css.filters}>
          <button className={css.filterBtn} onClick={() => setFilter(null)}>
            All
          </button>
          <button className={css.filterBtn} onClick={() => setFilter("Todo")}>
            Todo
          </button>
          <button className={css.filterBtn} onClick={() => setFilter("Work")}>
            Work
          </button>
          <button
            className={css.filterBtn}
            onClick={() => setFilter("Personal")}
          >
            Personal
          </button>
          <button
            className={css.filterBtn}
            onClick={() => setFilter("Meeting")}
          >
            Meeting
          </button>
          <button
            className={css.filterBtn}
            onClick={() => setFilter("Shopping")}
          >
            Shopping
          </button>
        </div>
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <>
          {notes.length === 0 ? (
            <p className={css.noNotes}>
              No notes found. Try changing your search or filters!
            </p>
          ) : (
            <NoteList
              notes={notes}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          )}
        </>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onClose={closeModal}
            onSubmit={(values) => createMutation.mutate(values)}
          />
        </Modal>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
