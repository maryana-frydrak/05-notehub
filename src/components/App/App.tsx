import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      <NoteList />
    </div>
  );
}

export default App;
