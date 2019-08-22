import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character: Character = new Character();
  isCreateMode = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private characterService: CharacterService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;

    if (id === 'create') {
      this.isCreateMode = true;
    } else {

      this.characterService.read(Number(id))
        .subscribe(
          (character: Character) => this.character = character
        );
    }
  }

  save(): void {
    if (this.isCreateMode) {
      this.characterService.create(this.character)
        .pipe(
          filter(data => data !== null)
        )
        .subscribe(
          (character: Character) => alert('Success! ID: ' + character.id)
        );
    } else {
      this.characterService.update(this.character)
        .pipe(
          filter(data => data !== null)
        )
        .subscribe(() => alert('success'));
    }
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

}
