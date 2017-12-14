import {Race} from './race.model';

export class Character {

  constructor(public name: string,
              public description: string,
              public experience: number,
              public level: number,
              public strength: number,
              public agility: number,
              public intelligence: number,
              public race: Race) {
  }

}
