import {NgModule} from '@angular/core';
import {RacesComponent} from './races/races.component';
import {AdventuresComponent} from './adventures/adventures.component';
import {CharactersComponent} from './characters/characters.component';
import {LocationsComponent} from './locations/locations.component';
import {AccountComponent} from './account/account.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RaceDetailComponent} from './races/race-detail/race-detail.component';
import {RaceEditComponent} from './races/race-edit/race-edit.component';
import {CharacterEditComponent} from './characters/character-edit/character-edit.component';
import {CharacterDetailComponent} from './characters/character-detail/character-detail.component';
import {AdventureEditComponent} from './adventures/adventure-edit/adventure-edit.component';
import {AdventureDetailComponent} from './adventures/adventure-detail/adventure-detail.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'characters', component: CharactersComponent, children: [
    {path: 'new', component: CharacterEditComponent},
    {path: ':id', component: CharacterDetailComponent},
    {path: ':id/edit', component: CharacterEditComponent}
  ] },
  {path: 'adventures', component: AdventuresComponent, children: [
    {path: 'new', component: AdventureEditComponent},
    {path: ':id', component: AdventureDetailComponent},
    {path: ':id/edit', component: AdventureEditComponent}
  ] },
  {path: 'races', component: RacesComponent, children: [
    {path: 'new', component: RaceEditComponent},
    {path: ':id', component: RaceDetailComponent},
    {path: ':id/edit', component: RaceEditComponent}
  ] },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
