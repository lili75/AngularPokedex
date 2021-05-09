import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  MainComponent } from './main/main.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonInfoComponent } from './pokemon-list/pokemon-info/pokemon-info.component';
const routes: Routes = [
  
  { path: 'Main-Component', component: MainComponent },
  { path: 'Pokemon-List-Component', component: PokemonListComponent },
  { path: 'Pokemon-Info-Component/:name', component: PokemonInfoComponent },
  { path: '',   redirectTo: '/Main-Component', pathMatch: 'full' },
  { path: '**', redirectTo: '/Main-Component', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
