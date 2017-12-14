import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Character} from '../../shared/models/character.model';
import {Race} from '../../shared/models/race.model';
import {CharacterService} from '../../shared/services/character.service';
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
        if (this.characterService.getOne(this.id) === undefined) {
          this.characterService.getChanged().subscribe(() => {
            this.character = this.characterService.getOne(this.id);
          });
        } else {
          this.character = this.characterService.getOne(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteCharacter() {
    this.characterService.deleteOne(this.id, this.character);
    this.router.navigate(['/characters'])
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
