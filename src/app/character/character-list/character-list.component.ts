import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [
    {id: 1, name: 'Daenerys Targaryen', culture: 'Valyrian'},
    {id: 2, name: 'Jon Snow', culture: 'Northmen'}
  ];

  selectedCharacter: Character = new Character();

  constructor() { }

  ngOnInit() {
  }

  save(character: Character): void {
    if (character.id) {
      this.updateCharacter(character);
    } else {
      this.createCharacter(character);
    }
  }

  private updateCharacter(character: Character) {
    const index = character.id - 1;
    this.characters[index] = character;
  }

  private createCharacter(character: Character) {
    character.id = this.characters.length + 1;
    this.characters.push(character);
  }

}
