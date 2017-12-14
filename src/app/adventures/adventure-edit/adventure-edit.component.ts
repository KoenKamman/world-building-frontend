import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Adventure} from '../../shared/models/adventure.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdventureService} from '../../shared/services/adventure.service';
import {CharacterService} from '../../shared/services/character.service';
import {Character} from '../../shared/models/character.model';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.css']
})
export class AdventureEditComponent implements OnInit, OnDestroy {
  private id: string;
  private editMode = false;
  adventureForm: FormGroup;
  private subscription: Subscription;

  characters: Character[];

  private adventureName = '';
  private adventureDesc = '';
  private adventureXp = 0;
  adventureCharacter = undefined;

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private characterService: CharacterService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();

    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;

        if (this.editMode) {

          this.adventureService.getChanged()
            .subscribe(() => {
              const adventure = this.adventureService.getOne(this.id);
              this.adventureName = adventure.name;
              this.adventureDesc = adventure.description;
              this.adventureXp = adventure.experience_gain;
              this.adventureCharacter = adventure.characters;
              this.characterService.getAll();
              this.initForm();
            });

          this.characterService.getChanged()
            .subscribe((characters: Character[]) => {
              this.characters = characters;
              for (let i = 0, racesLength = this.characters.length; i < racesLength; i++) {
                if (this.characters[i]['_id'] === this.adventureCharacter['_id']) {
                  this.adventureCharacter = this.characters[i];
                  this.initForm();
                }
              }
            });

          this.adventureService.getAll();

        } else {

          this.characterService.getChanged()
            .subscribe((characters: Character[]) => {
              this.characters = characters;
            });
          this.characterService.getAll();

        }

      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.editMode) {
      this.adventureService.updateOne(this.id, this.adventureForm.value)
        .then(() => {
          this.router.navigate(['/adventures/' + this.id])
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      this.adventureService.addOne(this.adventureForm.value)
        .then((result) => {
          this.router.navigate(['/adventures/' + result._id])
            .catch((error) => {
              console.log(error);
            });
        });
    }
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['/adventures/' + this.id])
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.router.navigate(['/adventures/'])
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChange(character: Character) {
    this.adventureCharacter = character;
    this.adventureForm.value.characters = [this.adventureCharacter['id']];
  }

  private initForm() {

    this.adventureForm = new FormGroup({
      'name': new FormControl(this.adventureName, Validators.required),
      'description': new FormControl(this.adventureDesc, Validators.required),
      'characters': new FormControl(this.adventureCharacter),
      'experience_gain': new FormControl(this.adventureXp, [Validators.required, Validators.pattern(/^[0-9]*$/)])
    });
  }

}
