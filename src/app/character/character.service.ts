import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  characters: Character[] = [
    {id: 1, name: 'Daenerys Targaryen', culture: 'Valyrian'},
    {id: 2, name: 'Jon Snow', culture: 'Northmen'}
  ];

  readonly baseUrl = 'http://localhost:3000/characters';

  constructor(private httpClient: HttpClient) { }

  readAll(): Character[] {
    return this.characters;
  }

  read(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`${this.baseUrl}/${id}`);
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
