import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  readAll(): Observable<Character[]> {
    return this.httpClient
      .get<Character[]>(`${this.baseUrl}?_start=20&_end=120`)
      .pipe(
        catchError(() => {
          this.handleError('Fehler beim Laden der Characters!');
          return of([]);
        })
      );
  }

  read(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(() => {
          this.handleError(`Fehler beim Laden des Characters mit ${id}!`);
          return of(null);
        })
      );
  }

  create(character: Character): Observable<Character> {
    return this.httpClient.post<Character>(this.baseUrl, character)
      .pipe(
        catchError(() => {
          this.handleError(`Fehler beim Anlegen des neuen Characters mit!`);
          return of(null);
        })
      );
  }

  update(character: Character): Observable<Character> {
    return this.httpClient
      .put<Character>(`${this.baseUrl}/${character.id}`, character)
      .pipe(
        catchError(() => {
          this.handleError(`Fehler beim Speichern des Characters mit ${character.id}!`);
          return of(null);
        })
      );
  }

  private handleError(msg: string): void {
    alert(msg);
  }
}
