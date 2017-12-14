import {Subject} from 'rxjs/Subject';
import {Race} from '../models/race.model';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

@Injectable()
export class RaceService implements ResourceService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/races';
  private racesChanged = new Subject<Race[]>();
  private races: Race[] = [];

  constructor(private http: Http) {
  }

  setAll(races: Race[]): void {
    this.races = races;
    this.racesChanged.next(this.races.slice());
  }

  getAll(): void  {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then((races) => {
        console.log('Retrieved ' + races.json().length + ' race(s)');
        this.setAll(races.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getOne(index: string): Race {
    for (let i = 0, racesLength = this.races.length; i < racesLength; i++) {
      if (this.races[i]['_id'] === index) {
        return this.races[i];
      }
    }
    return undefined;
  }

  getChanged(): Subject<Race[]> {
    return this.racesChanged;
  }

  deleteOne(id: string, race: Race): void {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.races.splice(this.races.indexOf(race), 1);
        this.setAll(this.races);
        console.log('Deleted race with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addOne(race: Race): Promise<void | Response> {
    return this.http.post(this.serverUrl, race, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.races.push(result.json());
        this.setAll(this.races);
        console.log('Created race with MongoID: ' + result.json()._id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateOne(id: string, race: Race): Promise<void> {
    return this.http.put(this.serverUrl + '/' + id, race, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.races[this.races.indexOf(this.getOne(id))] = result.json();
        this.setAll(this.races);
        console.log('Updated race with MongoID: ' + result.json()._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
