import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitListComponent } from './fruit-list/fruit-list.component';
import { FruitFormComponent } from './fruit-form/fruit-form.component';
import { ApiComponent } from './api/api.component';
import { RandomUserListComponent } from './random-user-list/random-user-list.component';

const routes: Routes = [
  { path: '', component: FruitListComponent },
  { path: 'form', component: FruitFormComponent },
  { path: 'form/:id', component: FruitFormComponent },
  { path: 'api', component: ApiComponent },
  { path: 'random-users', component: RandomUserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
