import React from 'react';
import {IPreferences} from './workout-container'

interface IProps {
    preferences: IPreferences;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setPreferences: React.Dispatch<React.SetStateAction<IPreferences>>;
}

const WorkoutPreferences: React.FC<IProps> = ({setIsVisible, setPreferences, preferences}) => {
    const {duration, equipment} = preferences;
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPreferences({...preferences, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <h2>Workout Preferences</h2>
                <form onSubmit={() => setIsVisible(false)}>
                    <label>Duration:</label><br />
                    <input type="text" id="duration" name="duration" value={duration} onChange={(e) => handleOnChange(e)} /><br/>
                    <label>Equipment:</label><br />
                    <input type="text" id="equipment" name="equipment" value={equipment} onChange={(e) => handleOnChange(e)} /><br/><br/>
                    <input type="submit" value="Submit" />
                </form> 
        </div>
    )
}

export default WorkoutPreferences;