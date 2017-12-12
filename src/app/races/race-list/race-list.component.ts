import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Race} from '../../shared/race.model';
import {RaceService} from '../../shared/race.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit, OnDestroy {
  private races: Race[];
  private subscription: Subscription;

  constructor(private raceService: RaceService,
              private router: Router,
              private route: ActivatedRoute) {
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

  onNewRace() {
    this.router.navigate(['new'], {relativeTo: this.route})
      .catch((error) => {
        console.log(error);
      });
  }

}
