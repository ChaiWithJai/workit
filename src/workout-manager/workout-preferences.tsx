import React from 'react';
import {IPreferences} from './workout-container'

interface IProps {
    preferences: IPreferences;
    setPreferences: React.Dispatch<React.SetStateAction<IPreferences>>;
}

const options = ['', 'dumbbell', 'band']

const WorkoutPreferences: React.FC<IProps> = ({setPreferences, preferences}) => {
    const {duration, equipment} = preferences;
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        setPreferences({...preferences, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <h2>Workout Preferences</h2>
                <form>
                    <label>Duration:</label><br />
                    <input type="text" id="duration" name="duration" value={duration} onChange={(e) => handleOnChange(e)} /><br/>
                    <label>Equipment:</label><br />
                    <select id="equipment" name="equipment" value={equipment} onChange={(e) => handleOnChange(e)}>
                        {
                            options.map((option,idx) => {
                            return <option key={`option ${idx}`} value={option}>{option}</option>
                            })
                        }
                    </select>
                    <br/><br/>
                </form> 
        </div>
    )
}

export default WorkoutPreferences;