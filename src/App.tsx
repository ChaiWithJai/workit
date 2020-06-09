import React from 'react';
import './App.css';
import WorkoutContainer from './workout-manager/workout-container';

const App: React.FC = () => {
  return (
    <div>
      <header className="workit-header">
      <h1>💪🏾💪🏾💪🏾 Workit Circuits! 💪🏾💪🏾💪🏾</h1>
      </header>
      <WorkoutContainer />
    </div>
  );
}

export default App;
