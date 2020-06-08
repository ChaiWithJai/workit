import React from 'react';
import {exerciseFinder, IExercise, IRound} from '../helpers/workout-builder';

interface IProps {
    exercises: IExercise[];
    setUserFunnelIdx: React.Dispatch<React.SetStateAction<number>>;
    workout: IRound[];
}

const WorkoutOverview: React.FC<IProps> = ({exercises, setUserFunnelIdx, workout}: IProps) => {
    return (
        <>
            <table>
                <tr>
                    <th>Exercise</th>
                    <th>Duration</th>
                </tr>
                {
                    workout.map(({exercisesInRound}, idx) => {
                        return exercisesInRound.map((exercise, subIdx) =>{
                            const {duration} = exerciseFinder(exercise, exercises) as IExercise;
                            return (
                                <tr key={`exercise ${idx}-${subIdx}`}>
                                    <td>{exercise}</td>
                                    <td>{duration}</td>
                                </tr>
                            )
                        })
                    })
                }
            </table>
            <button onClick={() => setUserFunnelIdx(3)}>Let's get started!!</button>
        </>
    )
}

export default WorkoutOverview;