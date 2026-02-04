import styles from "./MoodScale.module.css";

function MoodScale({ value, onChange }) {
  const options = [1, 2, 3, 4, 5];

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>How are you feeling?</p>
      <div className={styles.scaleRow}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${
              value === option ? styles.selected : ""
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodScale;

