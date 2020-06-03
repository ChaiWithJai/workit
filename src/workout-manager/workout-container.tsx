import React, {useEffect, useState} from 'react';
import WorkoutOverview from './workout-overview'
import WorkoutPreferences from './workout-preferences';
import {workoutBuilder, IRound} from '../helpers/workout-builder';
import staticData from '../static-data'

export interface IPreferences {
    duration: number;
    equipment: string | undefined;
}

const WorkoutContainer: React.FC = () => {
    const [isVisible, setIsVisible]= useState<boolean>(true);
    const [preferences, setPreferences] = useState<IPreferences>({duration: 0, equipment: ''})
    const [workout, setWorkout] = useState<IRound[]>([])
    const {exercises, rounds} = staticData;

    useEffect(() => {
        setWorkout(workoutBuilder(rounds, exercises, preferences))
    }, [preferences, isVisible])

    return (
        <div>
            {
            isVisible && <>
                <WorkoutPreferences  preferences={preferences} setPreferences={setPreferences} />
                <WorkoutOverview setIsVisible={setIsVisible} workout={workout} exercises={exercises} />
            </>
            }
        </div>
    )
}

export default WorkoutContainer;