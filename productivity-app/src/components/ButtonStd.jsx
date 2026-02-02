import styles from "./ButtonStd.module.css";

function ButtonStd({
  children = "",
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default ButtonStd;