import {shuffle} from 'lodash';

export const workoutBuilder = (rounds, list, {duration, equipment}) => {
    const workoutRounds = [];
    let builder = rounds;
    const isBodyWeight = (equip) => equip === '';
  
    // user filters
    if (equipment || isBodyWeight(equipment)) builder = builder.filter(({exercisesInRound}) => {
      let isWithNecessaryEquipment = true;
      for (const exercise of exercisesInRound) {
        const {equipmentNeeded} = list.find(ex => ex.name === exercise);
  
        if (equipmentNeeded !== equipment && !isBodyWeight(equipmentNeeded)) {
          isWithNecessaryEquipment = false;
        }
      };
      return isWithNecessaryEquipment;
    })
  
    if (builder.length < duration) throw new Error('Not enough exercises that meet this criteria');
  
    const roundsShuffled = shuffle(builder);
  
    const starter = roundsShuffled.filter(({isStarter}) => isStarter).slice(0, duration >= 9 ? 2 : 1);
    
    //get starter
    workoutRounds.push(...starter);
  
    //get middle
    const middleRoundLength = duration - workoutRounds.length  - 1;
  
    const middle = roundsShuffled.filter(({isStarter, isFinisher}) => !isStarter && !isFinisher)
    
    if (middleRoundLength > middle.length) {
      throw new Error('Not enough exercises that meet this criteria');
    } else {
      middle.slice(0, middleRoundLength)
    }
  
    workoutRounds.push(...middle)
  
    const finisher = roundsShuffled.find(({isFinisher}) => isFinisher);
  
    workoutRounds.push(finisher)
  
    return workoutRounds;
  }