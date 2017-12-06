import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {AccountComponent} from './account/account.component';
import {CharactersComponent} from './characters/characters.component';
import {LocationsComponent} from './locations/locations.component';
import {AdventuresComponent} from './adventures/adventures.component';
import {RacesComponent} from './races/races.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    CharactersComponent,
    LocationsComponent,
    AdventuresComponent,
    RacesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
