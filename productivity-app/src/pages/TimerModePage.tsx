import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import { isValidTimerMode, type TimerMode } from '../timerModes';

const TimerModePage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();

  if (!mode) {
    return <div>Mode not found</div>;
  }

  // If the user somehow navigates to an unsupported mode we fall back to custom.
  const useMode: TimerMode = isValidTimerMode(mode) ? mode : 'custom';

  if (useMode !== mode) {
    console.warn(`Unknown timer mode "${mode}", falling back to custom.`);
  }

  return (
    <Timer 
      mode={useMode} 
      onBack={() => navigate('/')} 
    />
  );
};

export default TimerModePage;
