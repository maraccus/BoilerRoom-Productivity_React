import styles from "./GraphWeekday.module.css";

const events = [
  {
    id: 1,
    title: "",
    start: 8,
    end: 10,
    color: "yellow"
  },
  {
    id: 2,
    title: "",
    start: 10.5,
    end: 11.5,
    color: "yellow"
  },
  {
    id: 3,
    title: "Current sprint",
    start: 14,
    end: 15,
    color: "green"
  }
];

export default function GraphWeekday() {
  return (
    <div className={styles.day}>
      <header className={styles.header}>
        <h1>Monday</h1>
        <h2>January 13</h2>
      </header>

      <div className={styles.timeline}>
        {Array.from({ length: 24 }).map((_, hour) => (
          <div key={hour} className={styles.hour}>
            <span className={styles.hourLabel}>
              {hour.toString().padStart(2, "0")}
            </span>
            <div className={styles.line} />
          </div>
        ))}

        {events.map(event => (
          <div
            key={event.id}
            className={`${styles.event} ${styles[event.color]}`}
            style={{
              top: `${event.start * 60}px`,
              height: `${(event.end - event.start) * 60}px`
            }}
          >
            {event.title}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
}
