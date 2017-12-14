import {Subject} from 'rxjs/Subject';
import {Http, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Adventure} from '../models/adventure.model';

@Injectable()
export class AdventureService implements ResourceService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/adventures';
  private resourcesChanged = new Subject<Adventure[]>();
  private resources: Adventure[] = [];

  constructor(private http: Http) {
  }

  setAll(adventures: Adventure[]): void {
    this.resources = adventures;
    this.resourcesChanged.next(this.resources.slice());
  }

  getAll(): void {
    this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then((adventures) => {
        console.log('Retrieved ' + adventures.json().length + ' adventure(s)');
        this.setAll(adventures.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getOne(index: string): Adventure {
    for (let i = 0, adventuresLength = this.resources.length; i < adventuresLength; i++) {
      if (this.resources[i]['_id'] === index) {
        return this.resources[i];
      }
    }
    return undefined;
  }

  getChanged(): Subject<Adventure[]> {
    return this.resourcesChanged;
}

  deleteOne(id: string, adventure: Adventure): void {
    this.http.delete(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((result: Response) => {
        this.resources.splice(this.resources.indexOf(adventure), 1);
        this.setAll(this.resources);
        console.log('Deleted adventure with MongoID: ' + id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addOne(adventure: Adventure): Promise {
    return this.http.post(this.serverUrl, adventure, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.resources.push(result.json());
        this.setAll(this.resources);
        console.log('Created adventure with MongoID: ' + result.json()._id);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateOne(id: string, adventure: Adventure): Promise {
    return this.http.put(this.serverUrl + '/' + id, adventure, {headers: this.headers})
      .toPromise()
      .then((result) => {
        this.resources[this.resources.indexOf(this.getOne(id))] = result.json();
        this.setAll(this.resources);
        console.log('Updated adventure with MongoID: ' + result.json()._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
