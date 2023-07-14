import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToUpperCase]'
})
export class ToUpperCaseDirective {

  constructor(private elRef: ElementRef) {
    this.elRef = elRef;
  }

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    input.value = input.value.toUpperCase();
  }

  ngOnInit(): any {
    this.elRef.nativeElement.value = this.elRef.nativeElement.value.toUpperCase();
  }

}
