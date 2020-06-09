import {addSeconds, differenceInSeconds} from 'date-fns';
import React, {useEffect, useReducer} from 'react';
import { IExercise } from '../helpers/workout-builder';
import youtubeSearch from '../youtube-search-helpers/search-helper';
import VideoIFrame from '../youtube-search-helpers/video-iframe';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

console.log('api key', YOUTUBE_API_KEY)

interface IProps {
    workoutList: IExercise[];
}

interface IAction {
    type: 'next' | 'pace';
}

interface IState {
    currentExerciseIdx: number;
    currentExercise: IExercise;
    timeOver: Date;
    timeLeft: number;
}

const WorkoutExercise: React.FC<IProps> = ({ workoutList}: IProps) => {
    const initialState: IState = {
        currentExerciseIdx: 0, 
        currentExercise: workoutList[0],
        timeLeft: workoutList[0].duration,
        timeOver: addSeconds(new Date(), workoutList[0].duration),
    };

    const reducer = (state: IState, action: IAction): IState => {
        switch(action.type) {
            case 'next':
                return {...state, currentExerciseIdx: state.currentExerciseIdx+1, currentExercise: workoutList[state.currentExerciseIdx+1], timeOver: addSeconds(new Date(), workoutList[state.currentExerciseIdx+1].duration), timeLeft: workoutList[state.currentExerciseIdx+1].duration};
            case 'pace':
                return {...state, timeLeft: differenceInSeconds(state.timeOver, new Date())}
        }
    };

    const [{currentExercise, timeLeft}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const interval = setInterval(() => dispatch({type: 'pace'}), 1000);
        if (timeLeft <= 0) {
            dispatch({type: 'next'});
            return;
        }
        return () => clearInterval(interval);
    }, [timeLeft])

    return (
        <>
        <h1>
        <span>
          {timeLeft}
        </span>
        </h1>
        <br /><br /><br />
        <h2>{currentExercise.name}</h2>
        <h3>How To:</h3>
        <VideoIFrame video={youtubeSearch(YOUTUBE_API_KEY ?? '', workoutList[0].name)} />
        </>
    )
}

export default WorkoutExercise;