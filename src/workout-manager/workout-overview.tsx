import React from 'react';

const WorkoutOverview: React.FC = () => {
    return (
        <table>
            <tr>
                <th>Exercise</th>
                <th>Duration</th>
            </tr>
            <tr>
                <td>Plank</td>
                <td>180</td>
            </tr>
            <tr>
                <td>Push ups</td>
                <td>60</td>
            </tr>
        </table>
    )
}

export default WorkoutOverview;