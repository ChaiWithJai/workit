import {shuffle} from 'lodash';

export interface IExercise {
    name: string
    duration: number
    planeOfMotion: string | string[]
    writtenInstructions: string | null
    mediaInstructions: string | null | any
    spaceNeeded:  string, // should this be more like a scale
    cardioIntensity:  string
    impactToBody:  string
    equipmentNeeded: string
}

export interface IRound {
    exercisesInRound: string[];
    intensity: string;
    isStarter: boolean;
    isFinisher: boolean;
}

interface IUserPreferences {
    duration: number;
    equipment: string | undefined;
}

export const exerciseFinder = (exerciseName: string, list: IExercise[]) => list.find(ex => ex.name === exerciseName)

export const workoutBuilder = (rounds: IRound[], list: IExercise[], {duration, equipment}: IUserPreferences): IRound[] => {
    if (!duration) return [];
    const workoutRounds: IRound[] = [];
    let builder = rounds;
    const isBodyWeight = (equip: string | undefined) => equip === '';
  
    // user filters
    if (equipment || isBodyWeight(equipment)) builder = builder.filter(({exercisesInRound}: IRound) => {
      let isWithNecessaryEquipment = true;
      for (const exercise of exercisesInRound) {
        const {equipmentNeeded} = list.find(ex => ex.name === exercise) as IExercise;
  
        if (equipmentNeeded !== equipment && !isBodyWeight(equipmentNeeded)) {
          isWithNecessaryEquipment = false;
        }
      };
      return isWithNecessaryEquipment;
    })
  
    const roundsShuffled = shuffle(builder);
  
    const starter = roundsShuffled.filter(({isStarter}) => isStarter).slice(0, duration >= 9 ? 2 : 1);
    
    //get starter
    workoutRounds.push(...starter);
  
    //get middle
    const middleRoundLength = duration - workoutRounds.length  - 1;
  
    const middle = roundsShuffled.filter(({isStarter, isFinisher}) => !isStarter && !isFinisher).slice(0, middleRoundLength)
      
    workoutRounds.push(...middle)

    // pad middle rounds
    if (workoutRounds.length < duration) {
      let numberOfRoundsRemaining = duration - workoutRounds.length -1;
      while (numberOfRoundsRemaining > 0) {
        const extraRounds = middle.slice(0, numberOfRoundsRemaining)
        workoutRounds.splice(builder.length-1,0, ...extraRounds.slice(0,numberOfRoundsRemaining));
        numberOfRoundsRemaining -= extraRounds.length;
      }
    };

    const finisher = roundsShuffled.find(({isFinisher}) => isFinisher) as IRound;
  
    workoutRounds.push(finisher)
  
    return workoutRounds;
  }