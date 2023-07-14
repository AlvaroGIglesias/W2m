import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @Input() hero: Hero | undefined;

  @Output() editClicked = new EventEmitter<string>();
  @Output() deleteClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  onEdit(): void {
    this.editClicked.emit(this.hero?.id);
  }

  onDelete(): void {
    this.deleteClicked.emit(this.hero?.id);
  }

}
