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

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.character = this.characterService.read(Number(id));
  }

  save(): void {
    this.characterSaved.emit(this.character);
    this.character = new Character();
  }

}
