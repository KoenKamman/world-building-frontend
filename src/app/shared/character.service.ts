import {Subject} from 'rxjs/Subject';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Character} from './character.model';

@Injectable()
export class CharacterService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/characters';
  charactersChanged = new Subject<Character[]>();
  private characters: Character[] = [];

  constructor(private http: Http) {
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
    this.charactersChanged.next(this.characters.slice());
  }

  getCharacters() {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then((characters) => {
        console.log('Retrieved ' + characters.json().length + ' character(s)');
        this.setCharacters(characters.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCharacter(index: string) {
    for (let i = 0, charactersLength = this.characters.length; i < charactersLength; i++) {
      if (this.characters[i]['_id'] === index) {
        return this.characters[i];
      }
    }
    return undefined;
  }

  deleteCharacter(id: string, character: Character) {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.characters.splice(this.characters.indexOf(character), 1);
        this.setCharacters(this.characters);
        console.log('Deleted character with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addCharacter(character: Character) {
  }

  updateCharacter(id: string, character: Character) {
  }

}
