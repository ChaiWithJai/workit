import React, {useEffect, useState} from 'react';
import WorkoutExercise from './workout-exercise';
import WorkoutWelcome from './workout-welcome';
import WorkoutOverview from './workout-overview';
import WorkoutPreferences from './workout-preferences';
import {exerciseFinder, workoutBuilder, IExercise, IRound} from '../helpers/workout-builder';
import staticData from '../static-data'

export interface IPreferences {
    duration: number;
    equipment: string | undefined;
}

const WorkoutContainer: React.FC = () => {
    const [userFunnelIdx, setUserFunnelIdx] = useState<number>(0);
    const [preferences, setPreferences] = useState<IPreferences>({duration: 3, equipment: ''})
    const [workout, setWorkout] = useState<IRound[]>([]);
    const {exercises, rounds} = staticData;

    const workoutList = workout.map(({exercisesInRound}) => {
        return exercisesInRound.map(exercise => {
            return exerciseFinder(exercise, exercises) as IExercise
        })
    }).flat();

    const renderSwitch = (idx: number) => {
        switch(idx) {
            case 0: return <WorkoutWelcome setUserFunnelIdx={setUserFunnelIdx} />;
            case 1: return <WorkoutPreferences setUserFunnelIdx={setUserFunnelIdx} preferences={preferences} setPreferences={setPreferences} />;
            case 2: return <WorkoutOverview setUserFunnelIdx={setUserFunnelIdx} workout={workout} exercises={exercises} />;
            case 3: return <WorkoutExercise workoutList={workoutList} />
        }
    };

    useEffect(() => {
        setWorkout(workoutBuilder(rounds, exercises, preferences));
    }, [preferences, exercises, rounds]);


    return (
        <div>
            {renderSwitch(userFunnelIdx)}
        </div>
    )
}

export default WorkoutContainer;