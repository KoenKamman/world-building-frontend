import {Subject} from 'rxjs/Subject';
import {Race} from '../shared/race.model';
import {Http} from '@angular/http';
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
        console.log(races.json());
        this.setRaces(races.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
