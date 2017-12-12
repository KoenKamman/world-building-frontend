import {Subject} from 'rxjs/Subject';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Adventure} from './adventure.model';

@Injectable()
export class AdventureService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/adventures';
  adventuresChanged = new Subject<Adventure[]>();
  private adventures: Adventure[] = [];

  constructor(private http: Http) {
  }

  setAdventures(adventures: Adventure[]) {
    this.adventures = adventures;
    this.adventuresChanged.next(this.adventures.slice());
  }

  getAdventures() {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then((adventures) => {
        console.log('Retrieved ' + adventures.json().length + ' adventure(s)');
        this.setAdventures(adventures.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAdventure(index: string) {
    for (let i = 0, adventuresLength = this.adventures.length; i < adventuresLength; i++) {
      if (this.adventures[i]['_id'] === index) {
        return this.adventures[i];
      }
    }
    return undefined;
  }

  deleteAdventure(id: string, adventure: Adventure) {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.adventures.splice(this.adventures.indexOf(adventure), 1);
        this.setAdventures(this.adventures);
        console.log('Deleted adventure with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addAdventure(adventure: Adventure) {
  }

  updateAdventure(id: string, adventure: Adventure) {
  }

}
