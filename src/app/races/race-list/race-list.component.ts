import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Race} from '../../shared/race.model';
import {RaceService} from '../../shared/race.service';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit, OnDestroy {
  races: Race[];
  subscription: Subscription;

  constructor(private raceService: RaceService) {
  }

  onNewRace() {

  }

  ngOnInit() {
    this.subscription = this.raceService.racesChanged
      .subscribe((races: Race[]) => {
        this.races = races;
      });
    this.raceService.getRaces();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
