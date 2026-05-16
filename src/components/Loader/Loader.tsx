import css from "./Loader.module.css";
import { PacmanLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <PacmanLoader color="#49dab8" />
    </div>
  );
}
