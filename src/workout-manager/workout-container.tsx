import React, {useEffect, useState} from 'react';
import WorkoutExercise from './workout-exercise';
import WorkoutOverview from './workout-overview'
import WorkoutPreferences from './workout-preferences';
import {exerciseFinder, workoutBuilder, IExercise, IRound} from '../helpers/workout-builder';
import staticData from '../static-data'

export interface IPreferences {
    duration: number;
    equipment: string | undefined;
}

const WorkoutContainer: React.FC = () => {
    const [isVisible, setIsVisible]= useState<boolean>(true);
    const [preferences, setPreferences] = useState<IPreferences>({duration: 0, equipment: ''})
    const [workout, setWorkout] = useState<IRound[]>([]);
    const {exercises, rounds} = staticData;

    const workoutList = workout.map(({exercisesInRound}) => {
        return exercisesInRound.map(exercise => {
            return exerciseFinder(exercise, exercises) as IExercise
        })
    }).flat();

    useEffect(() => {
        setWorkout(workoutBuilder(rounds, exercises, preferences))
    }, [preferences, isVisible, exercises, rounds])

    return (
        <div>
            {
            isVisible ? <>
                <WorkoutPreferences  preferences={preferences} setPreferences={setPreferences} />
                <WorkoutOverview setIsVisible={setIsVisible} workout={workout} exercises={exercises} />
            </>
            :
            <WorkoutExercise workoutList={workoutList} />
            }
        </div>
    )
}

export default WorkoutContainer;