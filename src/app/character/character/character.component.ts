import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { catchError, pluck, switchMap, takeUntil } from 'rxjs/operators';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  isCreateMode = true;
  private destroy = new Subject<boolean>();

  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private characterService: CharacterService,
              private fb: FormBuilder

  ) {
  }

  ngOnInit() {

    this.initForm();

    this.route.params
      .pipe(
        pluck('id'),
        filter(id => id !== 'create'),
        switchMap((id: number) => this.characterService.read(Number(id))),
        takeUntil(this.destroy)
      )
      .subscribe(
        (character: Character) => {
          this.isCreateMode = false;
          this.form.patchValue(character);
        }
      );
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.isCreateMode) {
      this.characterService.create(this.form.getRawValue())
        .pipe(
          filter(data => data !== null),
          takeUntil(this.destroy)
        )
        .subscribe(
          (character: Character) => alert('Success! ID: ' + character.id)
        );
    } else {
      this.characterService.update(this.form.getRawValue())
        .pipe(
          filter(data => data !== null),
          takeUntil(this.destroy)
        )
        .subscribe(() => alert('success'));
    }
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  getDate() {
    return new Date();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      culture: null
    });
  }

}
