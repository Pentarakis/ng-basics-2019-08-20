import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[];
  displayColumns: string[]
    = ['id', 'name', 'culture'];

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router) {

    this.characterService.readAll()
    .subscribe(
      (characters: Character[]) => this.characters = characters
    );
  }

  ngOnInit() {
  }

  showDetails(character: Character): void {
    this.router.navigate([`./${character.id}`], {
      relativeTo: this.route
    });
  }

}
