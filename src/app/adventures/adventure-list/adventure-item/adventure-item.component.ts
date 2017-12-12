import {Component, Input, OnInit} from '@angular/core';
import {Adventure} from '../../../shared/adventure.model';

@Component({
  selector: 'app-adventure-item',
  templateUrl: './adventure-item.component.html',
  styleUrls: ['./adventure-item.component.css']
})
export class AdventureItemComponent implements OnInit {
  @Input() adventure: Adventure;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
