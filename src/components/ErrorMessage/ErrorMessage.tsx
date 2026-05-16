import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({
  message = "Something went wrong. Please try again later.",
}: ErrorMessageProps) => {
  return (
    <div className={css.errorWrapper}>
      <p className={css.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
