import {Directive, HostListener, HostBinding, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appStatBar]'
})
export class StatBarDirective {
  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'width', '50%');
  }
}
