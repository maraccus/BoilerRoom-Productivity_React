import React from 'react'

const TimerClock = () => {
  const totalTime = 60;
  const [timeLeft, setTimeLeft] = React.useState(totalTime);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const offset = circumference * (1 - progress);

  React.useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div style={{ width: 200, height: 200, position: "relative" }}>
      <svg width="200" height="200">
        {/* Background ring */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="8"
          fill="none"
        />

        {/* Progress ring */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#fff"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
      </svg>

      {/* Time text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          fontWeight: "600",
          color: "#fff"
        }}
      >
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
    </div>
  );
}

export default TimerClock