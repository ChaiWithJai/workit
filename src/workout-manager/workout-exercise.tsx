import React, {useState, useEffect} from 'react';
import { IExercise } from '../helpers/workout-builder';

interface IProps {
    currentExercise: string;
}

const WorkoutExercise: React.FC<IProps> = ({currentExercise}: IProps) => {
    const [timeLeft, setTimeLeft] = useState({currentTimeSec: 59, currentTimeMin: 2})

    const formatTime = (val: number) => {
        let value = val.toString();
        if (value.length < 2) {
          value = '0' + value;
        }
        return value;
      };

    const pace = () => {
        setTimeLeft({ ...timeLeft, currentTimeSec: timeLeft.currentTimeSec - 1 });
        if (timeLeft.currentTimeSec <= 0) {
          setTimeLeft({ ...timeLeft, currentTimeMin: timeLeft.currentTimeMin - 1, currentTimeSec: 59 });
        }
      };

    useEffect(() => {
        setTimeout(() => pace(), 1000)
    })

    return (
        <>
        <h1>
        <span>
          {formatTime(timeLeft.currentTimeMin)}:
          {formatTime(timeLeft.currentTimeSec)}
        </span>
        </h1>
        <br /><br /><br />
        <h2>{currentExercise}</h2>
        </>
    )
}

export default WorkoutExercise;