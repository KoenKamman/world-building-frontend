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
  private race: Race = new Race('', '', 0, 0, 0);
  private id: string;
  private subscription: Subscription;

  constructor(private raceService: RaceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        if (this.raceService.getRace(this.id) === undefined) {
          const sub2 = this.raceService.racesChanged.subscribe(() => {
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
    this.raceService.deleteRace(this.id, this.race);
    this.router.navigate(['/races'])
      .catch((error) => {
        console.log(error);
      });
  }

  onEditRace() {
    this.router.navigate(['edit'], {relativeTo: this.route})
      .catch((error) => {
        console.log(error);
      });
  }

}
