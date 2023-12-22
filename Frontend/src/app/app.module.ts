import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { RouleteComponent } from './roulette/roulete.component';
import { PlayerComponent } from './player/player.component';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { HomePageComponent } from './home-page/home-page.component';
import { environment } from 'src/environments/environment';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes : Routes = [
  {path: '', redirectTo: 'Login', pathMatch:'full'},
  {path: 'Login', component: LoginPageComponent},
  {path: 'Register', component: RegisterPageComponent},
  {path: 'MainMenu', component: HomePageComponent},
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
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
