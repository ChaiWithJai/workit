import React, {useEffect, useState} from 'react';
import WorkoutExercise from './workout-exercise';
import WorkoutWelcome from './workout-welcome';
import WorkoutOverview from './workout-overview';
import WorkoutPreferences from './workout-preferences';
import {exerciseFinder, IExercise, IRound} from '../helpers/workout-builder';
import staticData from '../static-data';
import youtubeSearch from '../youtube-search-helpers/search-helper';
import '../App.css';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;


export interface IPreferences {
    duration: number;
    equipment: string | undefined;
}

const WorkoutContainer: React.FC = () => {
    const [userFunnelIdx, setUserFunnelIdx] = useState<number>(0);
    const [workout, setWorkout] = useState<IRound[]>([]);
    const {exercises} = staticData;

    // add in youtube urls where null -- will move to middleware after backend is added
    const addYouTubeInstructionalVideo = (exercise: IExercise) => !exercise.mediaInstructions ? {...exercise, mediaInstructions: youtubeSearch(YOUTUBE_API_KEY ?? '', `how to ${exercise.name}`)} : exercise;

    const workoutList = workout.map(({exercisesInRound}) => {
        return exercisesInRound.map(exercise => {
            const foundExercise = exerciseFinder(exercise, exercises) as IExercise;
            return addYouTubeInstructionalVideo(foundExercise);
        })
    }).flat();

    const renderSwitch = (idx: number) => {
        switch(idx) {
            case 0: return <WorkoutWelcome setUserFunnelIdx={setUserFunnelIdx} />;
            case 1: return <WorkoutPreferences setUserFunnelIdx={setUserFunnelIdx} setWorkout={setWorkout} />;
            case 2: return <WorkoutOverview setUserFunnelIdx={setUserFunnelIdx} workout={workout} exercises={exercises} />;
            case 3: return <WorkoutExercise workoutList={workoutList} />
        }
    };


    return (
        <div className="container">
            {renderSwitch(userFunnelIdx)}
        </div>
    )
}

export default WorkoutContainer;