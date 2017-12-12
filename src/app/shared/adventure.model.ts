import {Character} from './character.model';

export class Adventure {

  constructor(public name: string,
              public description: string,
              public experience_gain: number,
              public characters: Character[]) {
  }

}
