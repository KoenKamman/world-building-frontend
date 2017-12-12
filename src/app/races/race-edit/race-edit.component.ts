import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {RaceService} from '../../shared/race.service';

@Component({
  selector: 'app-race-edit',
  templateUrl: './race-edit.component.html',
  styleUrls: ['./race-edit.component.css']
})
export class RaceEditComponent implements OnInit, OnDestroy {
  private id: string;
  private editMode = false;
  private raceForm: FormGroup;
  private subscription: Subscription;

  private raceName = '';
  private raceStr = 0;
  private raceInt = 0;
  private raceAgi = 0;
  private raceDesc = '';

  constructor(private route: ActivatedRoute,
              private raceService: RaceService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
            if (this.raceService.getRace(this.id) === undefined) {
              this.raceService.racesChanged.subscribe(() => {
                this.getRace();
                this.initForm();
              });
            } else {
              this.getRace();
            }
          }
          this.initForm();
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getRace() {
    const race = this.raceService.getRace(this.id);
    this.raceName = race.name;
    this.raceDesc = race.description;
    this.raceInt = race.intelligence_mod;
    this.raceAgi = race.agility_mod;
    this.raceStr = race.strength_mod;
  }

  onSubmit() {
    if (this.editMode) {
      this.raceService.updateRace(this.id, this.raceForm.value)
        .then(() => {
          this.router.navigate(['/races'])
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      this.raceService.addRace(this.raceForm.value);
    }
  }

  private initForm() {

    this.raceForm = new FormGroup({
      'name': new FormControl(this.raceName, Validators.required),
      'description': new FormControl(this.raceDesc, Validators.required),
      'strength_mod': new FormControl(this.raceStr, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      'agility_mod': new FormControl(this.raceAgi, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      'intelligence_mod': new FormControl(this.raceInt, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
    });
  }

}
