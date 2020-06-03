import React from 'react';
import {exerciseFinder, IExercise, IRound} from '../helpers/workout-builder';

interface IProps {
    exercises: IExercise[];
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    workout: IRound[];
}

const WorkoutOverview: React.FC<IProps> = ({exercises, setIsVisible, workout}: IProps) => {
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
            <button onClick={() => setIsVisible(false)}>Let's get started!!</button>
        </>
    )
}

export default WorkoutOverview;