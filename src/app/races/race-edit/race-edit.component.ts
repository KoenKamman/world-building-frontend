import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {RaceService} from '../../shared/services/race.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-race-edit',
  templateUrl: './race-edit.component.html',
  styleUrls: ['./race-edit.component.css']
})
export class RaceEditComponent implements OnInit, OnDestroy {
  private id: string;
  private editMode = false;
  raceForm: FormGroup;
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
            if (this.raceService.getOne(this.id) === undefined) {
              this.raceService.getChanged().subscribe(() => {
                this.getRace();
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
    const race = this.raceService.getOne(this.id);
    this.raceName = race.name;
    this.raceDesc = race.description;
    this.raceInt = race.intelligence_mod;
    this.raceAgi = race.agility_mod;
    this.raceStr = race.strength_mod;
  }

  onSubmit() {
    if (this.editMode) {
      this.raceService.updateOne(this.id, this.raceForm.value)
        .then(() => {
          this.router.navigate(['/races/' + this.id])
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      this.raceService.addOne(this.raceForm.value)
        .then((result: Response) => {
          this.router.navigate(['/races/' + result.json()['_id']])
            .catch((error) => {
              console.log(error);
            });
        });
    }
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['/races/' + this.id])
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.router.navigate(['/races/'])
        .catch((error) => {
          console.log(error);
        });
    }
  }

  private initForm() {

    this.raceForm = new FormGroup({
      'name': new FormControl(this.raceName, Validators.required),
      'description': new FormControl(this.raceDesc, Validators.required),
      'strength_mod': new FormControl(this.raceStr,
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.min(1),
          Validators.max(10)
        ]),
      'agility_mod': new FormControl(this.raceAgi,
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.min(1),
          Validators.max(10)
        ]),
      'intelligence_mod': new FormControl(this.raceInt,
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.min(1),
          Validators.max(10)
        ])
    });
  }

}
