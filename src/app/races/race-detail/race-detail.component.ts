import {Component, OnInit, OnDestroy} from '@angular/core';
import {Race} from '../../shared/race.model';
import {RaceService} from '../../shared/race.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.css']
})
export class RaceDetailComponent implements OnInit, OnDestroy {
  race: Race = new Race('', '', 0, 0, 0);
  id: number;
  subscription: Subscription;

  constructor(private raceService: RaceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        if (this.raceService.getRace(this.id) === undefined) {
          this.raceService.racesChanged.subscribe(() => {
            this.race = this.raceService.getRace(this.id);
          });
        } else {
          this.race = this.raceService.getRace(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteRace() {
    this.raceService.deleteRace(this.id, this.race['_id']);
    this.router.navigate(['/races'])
      .catch((error) => {
        console.log(error);
      });
  }

}
