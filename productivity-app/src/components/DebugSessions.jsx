export default function DebugSessions({ sessions }) {
  if (!sessions || Object.keys(sessions).length === 0) {
    return (
      <div style={{ marginTop: '1rem', opacity: 0.7 }}>
        <em>No sessions logged yet</em>
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#111',
        color: '#0f0',
        fontSize: '0.8rem',
        maxHeight: '300px',
        overflowY: 'auto',
        borderRadius: '6px'
      }}
    >
      <strong>DEBUG – Sessions</strong>

      {Object.entries(sessions).map(([date, daySessions]) => (
        <div key={date} style={{ marginTop: '0.75rem' }}>
          <div style={{ color: '#6cf' }}>{date}</div>

          <ul style={{ paddingLeft: '1rem' }}>
            {daySessions.map((s, i) => (
              <li key={i}>
                {s.start} → {s.end} ({s.duration}s)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
