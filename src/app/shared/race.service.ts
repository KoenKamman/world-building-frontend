import {Subject} from 'rxjs/Subject';
import {Race} from './race.model';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

@Injectable()
export class RaceService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/races';
  racesChanged = new Subject<Race[]>();
  private races: Race[] = [];

  constructor(private http: Http) {
  }

  setRaces(races: Race[]) {
    this.races = races;
    this.racesChanged.next(this.races.slice());
  }

  getRaces() {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then((races) => {
        console.log('Retrieved ' + races.json().length + ' race(s)');
        this.setRaces(races.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRace(index: string) {
    for (let i = 0, racesLength = this.races.length; i < racesLength; i++) {
      if (this.races[i]['_id'] === index) {
        return this.races[i];
      }
    }
    return undefined;
  }

  deleteRace(id: string, race: Race) {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.races.splice(this.races.indexOf(race), 1);
        this.setRaces(this.races);
        console.log('Deleted race with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addRace(race: Race) {
    return this.http.post(this.serverUrl, race, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.races.push(result.json());
        this.setRaces(this.races);
        console.log('Created race with MongoID: ' + result.json()._id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateRace(id: string, race: Race) {
    return this.http.put(this.serverUrl + '/' + id, race, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.races[this.races.indexOf(this.getRace(id))] = result.json();
        this.setRaces(this.races);
        console.log('Updated race with MongoID: ' + result.json()._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
