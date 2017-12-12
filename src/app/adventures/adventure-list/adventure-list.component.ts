import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdventureService} from '../../shared/adventure.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Adventure} from '../../shared/adventure.model';

@Component({
  selector: 'app-adventure-list',
  templateUrl: './adventure-list.component.html',
  styleUrls: ['./adventure-list.component.css']
})
export class AdventureListComponent implements OnInit, OnDestroy {
  adventures: Adventure[];
  subscription: Subscription;

  constructor(private adventureService: AdventureService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.adventureService.adventuresChanged
      .subscribe((adventures: Adventure[]) => {
        this.adventures = adventures;
      });
    this.adventureService.getAdventures();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewAdventure() {
    this.router.navigate(['new'], {relativeTo: this.route})
      .catch((error) => {
        console.log(error);
      });
  }

}
