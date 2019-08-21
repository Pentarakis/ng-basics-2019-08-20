import { Injectable } from '@angular/core';
import { Character } from './model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  characters: Character[] = [
    {id: 1, name: 'Daenerys Targaryen', culture: 'Valyrian'},
    {id: 2, name: 'Jon Snow', culture: 'Northmen'}
  ];

  constructor() { }

  readAll(): Character[] {
    return this.characters;
  }

  read(id: number): Character {
    const result = this.characters.filter(
      character => character.id === id
    );
    return result.length > 0 ?  result[0] : null;
  }

  create(character: Character): void {
    character.id = this.characters.length + 1;
    this.characters.push(character);
  }

  update(character: Character): void {
    const index = this.characters.findIndex(
      char => char.id === character.id
    );
    if (index >= 0) {
      this.characters[index] = character;
    }
  }
}
