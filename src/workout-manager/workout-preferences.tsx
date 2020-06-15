import React, {useState} from 'react';
import {IPreferences} from './workout-container';
import {workoutBuilder, IRound} from '../helpers/workout-builder';
import staticData from '../static-data';

interface IProps {
    setWorkout: React.Dispatch<React.SetStateAction<IRound[]>>;
    setUserFunnelIdx: React.Dispatch<React.SetStateAction<number>>;
}

const options = ['', 'dumbbell', 'band']

const WorkoutPreferences: React.FC<IProps> = ({setUserFunnelIdx, setWorkout}) => {
    const [preferences, setPreferences] = useState<IPreferences>({duration: 3, equipment: ''})
    const {duration, equipment} = preferences;
    const {exercises, rounds} = staticData;

    const handleSubmit = () => {
        setWorkout(workoutBuilder(rounds, exercises, preferences));
        setUserFunnelIdx(2);
    };
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name ?? e.currentTarget.name
        const value =  e.target.value ?? e.currentTarget.value;
        setPreferences({...preferences, [name]: name === 'duration' ? Number(value) : value});
    }

    const handleOnInput = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => setPreferences({...preferences, [e.currentTarget.name]: Number(e.currentTarget.value)});

    return (
        <form onSubmit={handleSubmit}>
            <h2>Workout Preferences</h2>
            <label>How many rounds do you wanna work?</label><br />
            <input type="number" min="3" max="12" id="duration" name="duration" value={duration} onClick={handleOnInput} onChange={handleOnChange} /><br/>
            <small><i>Rounds are 3 minutes each to replicate a boxing match.</i></small><br/><br/>
            <label>Select what workout equipment you can use:</label><br />
            <select id="equipment" name="equipment" value={equipment} onChange={handleOnChange}>
                {
                    options.map((option,idx) => {
                    if (!option) return <option key={`option ${idx}`} value={option}>bodyweight</option>
                    return <option key={`option ${idx}`} value={option}>{option}</option>
                    })
                }
            </select>
            <br/><br/>
            <input type="submit" value="View my workout" />
        </form>
    )
}

export default WorkoutPreferences;