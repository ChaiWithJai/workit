import React, {useState} from 'react';
import './App.css';
import WorkoutContainer from './workout-manager/workout-container';

interface IPreferences {
  duration: number;
  equipment: string;
}

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<IPreferences>({duration: 0, equipment: ''})
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
