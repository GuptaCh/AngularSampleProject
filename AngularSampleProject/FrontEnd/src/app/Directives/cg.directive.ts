import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCg]'
})
export class CgDirective {

  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^[a-zA-Z]*$/);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];
 
 constructor(private el: ElementRef) {
  }
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
  // Allow Backspace, tab, end, and home keys
  if (this.specialKeys.indexOf(event.key) !== -1) {
  return;
  }
  let current: string = this.el.nativeElement.value;
  let next: string = current.concat(event.key);
  if (next && !String(next).match(this.regex)) {
  event.preventDefault();
  }
  }

}
