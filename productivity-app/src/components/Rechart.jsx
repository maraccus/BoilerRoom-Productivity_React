import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Step1() {
  // Hämta sessions från localStorage
  const raw = JSON.parse(localStorage.getItem("timerSessions") || "{}");

  // Konvertera till array + summera duration per dag
  const data = Object.entries(raw)
    .map(([date, sessions]) => {
      const totalSeconds = sessions.reduce(
        (total, session) => total + session.duration,
        0
      );

      return {
        date,
        timeSpent: Math.round(totalSeconds / 60), // lagras i minuter
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Formatter för timmar + minuter
  const formatMinutes = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="var(--text)" strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          stroke="var(--text)"
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("sv-SE", {
              month: "short",
              day: "numeric",
            })
          }
        />

        <YAxis 
        stroke="var(--text)"
        tickFormatter={formatMinutes} 
        />

        <Tooltip 
        contentStyle={{backgroundColor: "var(--btn)",
            border: "1px solid var(--btn-text)"
        }}
        labelStyle={{color: "var(--btn-text)"}}
        itemStyle={{color: "var(--btn-text)"}}
        formatter={(value) => formatMinutes(value)} 
        />

        <Line
          type="monotone"
          dataKey="timeSpent"
          name="Time logged"
          stroke="var(--chart-line1)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}