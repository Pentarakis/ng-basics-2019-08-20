import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  selectedCharacter: Character = new Character();
  characters: Character[];

  constructor(private characterService: CharacterService) {
    this.characters = this.characterService.readAll();
  }

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
