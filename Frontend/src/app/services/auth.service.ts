import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private db: AngularFireDatabase) { }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['MainMenu']);
    }, err => {
      alert('Something went wrong');
      this.router.navigate(['/Login']);
    })
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

        // Push user data to Firebase Realtime Database under 'users' node
        this.db.object(`users/${user.uid}`).set(userData).then(() => {
          alert('Registration Successful');
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
}
