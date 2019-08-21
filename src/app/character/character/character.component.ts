import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input()
  character: Character = new Character();

  @Output()
  characterSaved: EventEmitter<Character> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  save(): void {
    this.characterSaved.emit(this.character);
    this.character = new Character();
  }

}
