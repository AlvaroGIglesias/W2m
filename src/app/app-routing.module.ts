import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './views/hero-list/hero-list.component';
import { HeroEditComponent } from './views/hero-edit/hero-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/hero-list', pathMatch: 'full' },
  { path: 'hero-list', component: HeroListComponent },
  { path: 'hero-edit', component: HeroEditComponent },
  { path: 'hero-edit/:id', component: HeroEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
