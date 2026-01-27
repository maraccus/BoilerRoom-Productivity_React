import styles from "./Button.module.css";

function Button({
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

export default Button;