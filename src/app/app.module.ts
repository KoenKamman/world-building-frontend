import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {AccountComponent} from './account/account.component';
import {CharactersComponent} from './characters/characters.component';
import {LocationsComponent} from './locations/locations.component';
import {AdventuresComponent} from './adventures/adventures.component';
import {RacesComponent} from './races/races.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {RaceListComponent} from './races/race-list/race-list.component';
import {RaceItemComponent} from './races/race-list/race-item/race-item.component';
import {RaceService} from './shared/race.service';
import {HttpModule} from '@angular/http';
import {RaceDetailComponent} from './races/race-detail/race-detail.component';
import {StatbarDirective} from './shared/statbar.directive';
import {RaceEditComponent} from './races/race-edit/race-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    CharactersComponent,
    LocationsComponent,
    AdventuresComponent,
    RacesComponent,
    HomeComponent,
    RaceListComponent,
    RaceItemComponent,
    RaceDetailComponent,
    StatbarDirective,
    RaceEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RaceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
