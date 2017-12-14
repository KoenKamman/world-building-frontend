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
  private resourcesChanged = new Subject<Character[]>();
  private resources: Character[] = [];

  constructor(private http: Http) {
  }

  setAll(characters: Character[]): void {
    this.resources = characters;
    this.resourcesChanged.next(this.resources.slice());
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
    return this.resourcesChanged;
  }

  getOne(index: string): Character {
    for (let i = 0, charactersLength = this.resources.length; i < charactersLength; i++) {
      if (this.resources[i]['_id'] === index) {
        return this.resources[i];
      }
    }
    return undefined;
  }

  deleteOne(id: string, character: Character): void {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.resources.splice(this.resources.indexOf(character), 1);
        this.setAll(this.resources);
        console.log('Deleted character with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addOne(character: Character): Promise {
    return this.http.post(this.serverUrl, character, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.resources.push(result.json());
        this.setAll(this.resources);
        console.log('Created character with MongoID: ' + result.json()._id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateOne(id: string, character: Character): Promise {
    return this.http.put(this.serverUrl + '/' + id, character, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.resources[this.resources.indexOf(this.getOne(id))] = result.json();
        this.setAll(this.resources);
        console.log('Updated character with MongoID: ' + result.json()._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
