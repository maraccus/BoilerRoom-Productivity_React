export default function DebugSessions({ sessions }) {
  const today = new Date().toISOString().split('T')[0]
  const todaysSessions = sessions[today] || []

  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        background: "var(--team-icon)",
        color: "var(--btn-text)",
        fontSize: '0.75rem',
        borderRadius: '6px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}
    >
      <strong>DEBUG – Sessions for {today}</strong>

      {todaysSessions.length === 0 ? (
        <div style={{ marginTop: '0.5rem' }}>
          <em>No sessions logged today</em>
        </div>
      ) : (
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
          {todaysSessions.map((s, i) => (
            <li key={i}>
              {s.start} → {s.end} ({s.duration}s)
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
