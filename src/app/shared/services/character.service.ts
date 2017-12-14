import {Subject} from 'rxjs/Subject';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Character} from '../models/character.model';

@Injectable()
export class CharacterService implements ResourceService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/characters';
  private charactersChanged = new Subject<Character[]>();
  private characters: Character[] = [];

  constructor(private http: Http) {
  }

  setAll(characters: Character[]): void {
    this.characters = characters;
    this.charactersChanged.next(this.characters.slice());
  }

  getAll(): void {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then((characters) => {
        console.log('Retrieved ' + characters.json().length + ' character(s)');
        this.setAll(characters.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getChanged(): Subject<Character[]> {
    return this.charactersChanged;
  }

  getOne(index: string): Character {
    for (let i = 0, charactersLength = this.characters.length; i < charactersLength; i++) {
      if (this.characters[i]['_id'] === index) {
        return this.characters[i];
      }
    }
    return undefined;
  }

  deleteOne(id: string, character: Character): void {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.characters.splice(this.characters.indexOf(character), 1);
        this.setAll(this.characters);
        console.log('Deleted character with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addOne(character: Character) {
    return this.http.post(this.serverUrl, character, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.characters.push(result.json());
        this.setAll(this.characters);
        console.log('Created character with MongoID: ' + result.json()._id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateOne(id: string, character: Character) {
    return this.http.put(this.serverUrl + '/' + id, character, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.characters[this.characters.indexOf(this.getOne(id))] = result.json();
        this.setAll(this.characters);
        console.log('Updated character with MongoID: ' + result.json()._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
