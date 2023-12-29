import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { PlayerService } from '../PlayerService/player.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string = '';
  userIsNotLogedIn: boolean = true;
  constructor(private fireauth : AngularFireAuth, private router : Router, private db: AngularFireDatabase, private playerService: PlayerService) { }
  private userDataSubscription: any;

  login(email: string, password: string) {
      this.fireauth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        if (userCredential && userCredential.user) {
          localStorage.setItem('token', 'true');
          const userId = userCredential.user.uid;
          console.log(userId);
           this.userDataSubscription = this.db.object(`users/${userId}`).valueChanges().subscribe((userData: any) => {
            console.log('Fetched user data:', userData);
            this.playerService.player = {
              id: userId,
              email: userData.email,
              username: userData.username,
              credits: userData.credits
            }
            this.router.navigate(['MainMenu']);
            this.userIsNotLogedIn = false;
            this.unsubscribeUserDataChanges();
          }, (error) => {
            console.error('Error fetching user data:', error);
            alert('Something went wrong while fetching user data');
            this.router.navigate(['/Login']);
          });
        }
      }).catch((error) => {
        console.error('Error logging in:', error);
        alert('Something went wrong during login');
        this.router.navigate(['/Login']);
      });
  }

  register(email: string, password: string, newUsername: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential && userCredential.user) {
        // Registration successful, get user data
        const user = userCredential.user;

        // Assign 1000 credits to the new user
        const credits = 1000;

        // Create user data object with initial credits
        const userData = {
          email: user.email,
          username: newUsername,
          credits: credits
        };
        this.uid = user.uid;

        // Push user data to Firebase Realtime Database under 'users' node
        this.db.object(`users/${user.uid}`).set(userData).then(() => {
          alert('Registration Successful');
          localStorage.setItem('token', 'true');
          this.router.navigate(['/MainMenu']);
        }).catch((error) => {
          console.error('Error creating user data in database:', error);
          alert('Something went wrong with registration');
          this.router.navigate(['/Register']);
        });
      }
    }).catch((error) => {
      console.error('Error registering user:', error);
      alert('Something went wrong with registration');
      this.router.navigate(['/Register']);
    });
  }

  signOut(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token')
      this.router.navigate(['/Login']);
    })
  }

  unsubscribeUserDataChanges() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

}
