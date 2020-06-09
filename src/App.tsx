import React from 'react';
import './App.css';
import WorkoutContainer from './workout-manager/workout-container';

const App: React.FC = () => {
  return (
    <div className="Workit">
      <header className="Workit-header">
        Workit!
      </header>
      <WorkoutContainer />
    </div>
  );
}

export default App;
