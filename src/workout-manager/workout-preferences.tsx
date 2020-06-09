import React from 'react';
import {IPreferences} from './workout-container'

interface IProps {
    preferences: IPreferences;
    setPreferences: React.Dispatch<React.SetStateAction<IPreferences>>;
    setUserFunnelIdx: React.Dispatch<React.SetStateAction<number>>;
}

const options = ['', 'dumbbell', 'band']

const WorkoutPreferences: React.FC<IProps> = ({setUserFunnelIdx, setPreferences, preferences}) => {
    const {duration, equipment} = preferences;
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        setPreferences({...preferences, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <h2>Workout Preferences</h2>
                <label>How many rounds do you wanna work?</label><br />
                <input type="number" min="3" max="12" id="duration" name="duration" value={duration} onChange={(e) => handleOnChange(e)} /><br/>
                <small><i>Rounds are 3 minutes each to replicate a boxing match.</i></small><br/><br/>
                <label>Select what workout equipment you can use:</label><br />
                <select id="equipment" name="equipment" value={equipment} onChange={(e) => handleOnChange(e)}>
                    {
                        options.map((option,idx) => {
                        if (!option) return <option key={`option ${idx}`} value={option}>bodyweight</option>
                        return <option key={`option ${idx}`} value={option}>{option}</option>
                        })
                    }
                </select>
                <br/><br/>
                <button onClick={() => setUserFunnelIdx(2)}>View my workout</button>
        </div>
    )
}

export default WorkoutPreferences;