import {Component, OnInit, OnDestroy} from '@angular/core';
import {Race} from '../../shared/models/race.model';
import {RaceService} from '../../shared/services/race.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.css']
})
export class RaceDetailComponent implements OnInit, OnDestroy {
  race: Race = new Race('', '', 0, 0, 0);
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
        if (this.raceService.getOne(this.id) === undefined) {
          this.raceService.getChanged().subscribe(() => {
            this.race = this.raceService.getOne(this.id);
          });
        } else {
          this.race = this.raceService.getOne(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteRace() {
    this.raceService.deleteOne(this.id, this.race);
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
