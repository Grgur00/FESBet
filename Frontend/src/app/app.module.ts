import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { RouleteComponent } from './roulete/roulete.component';
import { PlayerComponent } from './player/player.component';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { HomePageComponent } from './home-page/home-page.component';

const appRoutes : Routes = [
  {path: '', component: HomePageComponent},
  {path: 'Roulete', component: RouleteComponent},
  {path: 'Player', component: PlayerComponent},
  {path: 'BlackJack', component: BlackJackComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RouleteComponent,
    PlayerComponent,
    BlackJackComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
