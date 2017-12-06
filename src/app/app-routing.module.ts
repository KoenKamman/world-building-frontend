import {NgModule} from '@angular/core';
import {RacesComponent} from './races/races.component';
import {AdventuresComponent} from './adventures/adventures.component';
import {CharactersComponent} from './characters/characters.component';
import {LocationsComponent} from './locations/locations.component';
import {AccountComponent} from './account/account.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'adventures', component: AdventuresComponent},
  {path: 'races', component: RacesComponent},
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
