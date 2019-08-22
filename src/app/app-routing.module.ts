import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './basic-layout/dashboard/dashboard.component';

const routes: Routes = [
  { path : '', component: DashboardComponent},
  {
    path : 'character',
    loadChildren: () => import('./character/character.module')
      .then(m => m.CharacterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
