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
import {CharacterListComponent} from './characters/character-list/character-list.component';
import {CharacterDetailComponent} from './characters/character-detail/character-detail.component';
import {CharacterEditComponent} from './characters/character-edit/character-edit.component';
import {CharacterItemComponent} from './characters/character-list/character-item/character-item.component';
import {CharacterService} from './shared/character.service';
import {AdventureListComponent} from './adventures/adventure-list/adventure-list.component';
import {AdventureEditComponent} from './adventures/adventure-edit/adventure-edit.component';
import {AdventureDetailComponent} from './adventures/adventure-detail/adventure-detail.component';
import {AdventureItemComponent} from './adventures/adventure-list/adventure-item/adventure-item.component';
import {AdventureService} from './shared/adventure.service';

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
    RaceEditComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterEditComponent,
    CharacterItemComponent,
    AdventureListComponent,
    AdventureEditComponent,
    AdventureDetailComponent,
    AdventureItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RaceService, CharacterService, AdventureService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
