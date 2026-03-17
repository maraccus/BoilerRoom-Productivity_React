import confetti from "canvas-confetti";
import styles from "./ConfettiButton.module.css";

function ConfettiButton() {

  const fireConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      spread: 100,
      origin: { x: Math.random(), y: 0 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

  return (
    <button className={styles.btn} onClick={fireConfetti}>
      Team Kattarp
    </button>
  );
}

export default ConfettiButton;