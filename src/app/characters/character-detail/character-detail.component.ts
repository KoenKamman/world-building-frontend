import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Character} from '../../shared/character.model';
import {Race} from '../../shared/race.model';
import {CharacterService} from '../../shared/character.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character: Character = new Character('', '', 0, 0, 0, 0, 0, new Race('', '', 0, 0, 0));
  private id: string;
  private subscription: Subscription;

  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        if (this.characterService.getCharacter(this.id) === undefined) {
          this.characterService.charactersChanged.subscribe(() => {
            this.character = this.characterService.getCharacter(this.id);
          });
        } else {
          this.character = this.characterService.getCharacter(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteCharacter() {
    this.characterService.deleteCharacter(this.id, this.character);
    this.router.navigate(['/races'])
      .catch((error) => {
        console.log(error);
      });
  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route})
      .catch((error) => {
        console.log(error);
      });
  }

}
