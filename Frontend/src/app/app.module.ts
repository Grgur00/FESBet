import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { RouleteComponent } from './roulete/roulete.component';
import { PlayerComponent } from './player/player.component';

const appRoutes : Routes = [
  {path: 'Roulete', component: RouleteComponent},
  {path: 'Player', component: PlayerComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RouleteComponent,
    PlayerComponent
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
