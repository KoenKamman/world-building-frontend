import {Component, Input, OnInit} from '@angular/core';
import {Race} from '../../../shared/models/race.model';

@Component({
  selector: 'app-race-item',
  templateUrl: './race-item.component.html',
  styleUrls: ['./race-item.component.css']
})
export class RaceItemComponent implements OnInit {
  @Input() race: Race;
  @Input() index: number;

  constructor() {
  }

  ngOnInit() {
  }

}
