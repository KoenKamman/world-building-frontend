import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdventureService} from '../../shared/adventure.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Adventure} from '../../shared/adventure.model';
import {Subscription} from 'rxjs/Subscription';
import {Character} from '../../shared/character.model';
import {Race} from '../../shared/race.model';

@Component({
  selector: 'app-adventure-detail',
  templateUrl: './adventure-detail.component.html',
  styleUrls: ['./adventure-detail.component.css']
})
export class AdventureDetailComponent implements OnInit, OnDestroy {
  adventure: Adventure = new Adventure('', '', 0, [new Character('', '', 0, 0, 0, 0, 0, new Race('', '', 0, 0, 0))]);
  private id: string;
  private subscription: Subscription;

  constructor(private adventureService: AdventureService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        if (this.adventureService.getAdventure(this.id) === undefined) {
          this.adventureService.adventuresChanged.subscribe(() => {
            this.adventure = this.adventureService.getAdventure(this.id);
          });
        } else {
          this.adventure = this.adventureService.getAdventure(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteAdventure() {
    this.adventureService.deleteAdventure(this.id, this.adventure);
    this.router.navigate(['/adventures'])
      .catch((error) => {
        console.log(error);
      });
  }

  onEditAdventure() {
    this.router.navigate(['edit'], {relativeTo: this.route})
      .catch((error) => {
        console.log(error);
      });
  }

}
