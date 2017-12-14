import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Race} from '../../shared/models/race.model';
import {RaceService} from '../../shared/services/race.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit, OnDestroy {
  races: Race[];
  subscription: Subscription;

  constructor(private raceService: RaceService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.raceService.getChanged()
      .subscribe((races: Race[]) => {
        this.races = races;
      });
    this.raceService.getAll();
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
