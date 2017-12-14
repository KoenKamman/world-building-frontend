import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CharacterService} from '../../shared/services/character.service';
import {Race} from '../../shared/models/race.model';
import {RaceService} from '../../shared/services/race.service';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit, OnDestroy {
  private id: string;
  private editMode = false;
  characterForm: FormGroup;
  private subscription: Subscription;

  races: Race[];

  private characterName = '';
  private characterDesc = '';
  private characterXp = 0;
  characterRace = undefined;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService,
              private raceService: RaceService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();

    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;

        if (this.editMode) {

          this.characterService.getChanged()
            .subscribe(() => {
              const character = this.characterService.getOne(this.id);
              this.characterName = character.name;
              this.characterDesc = character.description;
              this.characterXp = character.experience;
              this.characterRace = character.race;
              this.raceService.getAll();
              this.initForm();
            });

          this.raceService.getChanged()
            .subscribe((races: Race[]) => {
              this.races = races;
              for (let i = 0, racesLength = this.races.length; i < racesLength; i++) {
                if (this.races[i]['_id'] === this.characterRace['_id']) {
                  this.characterRace = this.races[i];
                  this.initForm();
                }
              }
            });

          this.characterService.getAll();

        } else {

          this.raceService.getChanged()
            .subscribe((races: Race[]) => {
              this.races = races;
            });
          this.raceService.getAll();

        }

      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.editMode) {
      this.characterService.updateOne(this.id, this.characterForm.value)
        .then(() => {
          this.router.navigate(['/characters/' + this.id])
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      this.characterService.addOne(this.characterForm.value)
        .then((result) => {
          this.router.navigate(['/characters/' + result._id])
            .catch((error) => {
              console.log(error);
            });
        });
    }
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['/characters/' + this.id])
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.router.navigate(['/characters/'])
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChange(race: Race) {
    this.characterRace = race;
    this.characterForm.value.race = race['_id'];
  }

  private initForm() {

    this.characterForm = new FormGroup({
      'name': new FormControl(this.characterName, Validators.required),
      'description': new FormControl(this.characterDesc, Validators.required),
      'race': new FormControl(this.characterRace),
      'experience': new FormControl(this.characterXp, [Validators.required, Validators.pattern(/^[0-9]*$/)])
    });
  }

}
