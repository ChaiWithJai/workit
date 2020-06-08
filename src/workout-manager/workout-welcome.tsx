import React from 'react';

interface IProps {
    setUserFunnelIdx: React.Dispatch<React.SetStateAction<number>>
}

const WorkoutWelcome: React.FC<IProps> = ({setUserFunnelIdx}) => (
    <>
    <h1>Welcome to Workit Circuits</h1>
    <h2>Let's build a custom workout for your schedule</h2>
    <br /><br />
    <small>We're currently in beta. Right now, we're building workouts in 3 minute intervals to match a boxing round. Your workout starts with a warm up, a total body workout and then an ab finisher.</small>
    <button onClick={() => setUserFunnelIdx(1)}>Let's Build</button>
    </>
)

export default WorkoutWelcome;