import React from 'react'
import styles from "./GraphWeekday.module.css";

const GraphWeekday = () => {
  return (
    <section className={styles.container}>
        <h2 className={styles.containerH2}>{new Date().toLocaleDateString("en-US", {
    weekday: "long",
  })}</h2>
        <h2 className={styles.containerH3}>{new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })}</h2>

        {Array.from({ length: 24 }).map((_, hour) => (
            <div className={styles.containerDay}>
                <div className={styles.dividerLine}></div>
                <div className={styles.containerInfo}>
                    <div className={styles.containerTime}>
                        <span className={styles.hourLabel}>
                            {hour.toString().padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        ))}
        <div className={styles.dividerLine}></div>

    </section>
  )
}

export default GraphWeekday