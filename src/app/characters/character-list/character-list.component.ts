import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Character} from '../../shared/character.model';
import {CharacterService} from '../../shared/character.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[];
  subscription: Subscription;

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.characterService.charactersChanged
      .subscribe((races: Character[]) => {
        this.characters = races;
      });
    this.characterService.getCharacters();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewCharacter() {
    this.router.navigate(['new'], {relativeTo: this.route})
      .catch((error) => {
        console.log(error);
      });
  }

}
