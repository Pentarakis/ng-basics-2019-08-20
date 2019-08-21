import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character: Character = new Character();
  characterSaved: EventEmitter<Character> = new EventEmitter();
  isCreateMode = false;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;

    if (id === 'create') {
      this.isCreateMode = true;
    } else {
      this.character = this.characterService.read(Number(id));
    }
   }

  save(): void {
    if (this.isCreateMode) {
      this.characterService.create(this.character);
    } else {
      this.characterService.update(this.character);
    }
    this.character = new Character();
  }

}
