import {Directive, ElementRef, HostBinding, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appStatbar]'
})
export class StatbarDirective implements OnChanges {
  @Input('type') type: string;
  @Input('mod') mod: number;


  @HostBinding('class.progress-bar') private progress = true;
  @HostBinding('class.progress-bar-danger') private strength = false;
  @HostBinding('class.progress-bar-success') private agility = false;
  @HostBinding('class.progress-bar-info') private intelligence = false;
  @HostBinding('style.width') private width = '0';

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.type + ' ' + this.mod;

    if (this.mod < 11) {
      this.width = this.mod + '0%';
    } else {
      this.width = '100%';
    }

    if (this.type === 'Intelligence') {
      this.intelligence = true;
    } else if (this.type === 'Strength') {
      this.strength = true;
    } else if (this.type === 'Agility') {
      this.agility = true;
    }
  }

}
