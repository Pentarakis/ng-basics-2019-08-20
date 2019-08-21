import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  characters: Character[] = [
    {id: 1, name: 'Daenerys Targaryen', culture: 'Valyrian'},
    {id: 2, name: 'Jon Snow', culture: 'Northmen'}
  ];

  selectedCharacter: Character = new Character();

  constructor() {
  }

  ngOnInit() {
  }

  save(): void {
    if (!this.selectedCharacter.id) {
      this.selectedCharacter.id = this.characters.length + 1;
    }
    this.characters.push(this.selectedCharacter);
    this.selectedCharacter = new Character();
  }

}
