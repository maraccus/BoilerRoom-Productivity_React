import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';

const TimerModePage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();

  if (!mode) {
    return <div>Mode not found</div>;
  }

  return (
    <Timer 
      mode={mode} 
      onBack={() => navigate('/')} 
    />
  );
};

export default TimerModePage;
