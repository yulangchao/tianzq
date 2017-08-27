import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {NzMessageService} from 'ng-zorro-antd'
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  public userInfo: any;
  constructor(public afAuth: AngularFireAuth, private message: NzMessageService, private router: Router) {
    this.user = afAuth.authState;
    let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
    this.userInfo = JSON.parse(localStorage.getItem(id));
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (res) => {
           let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
           this.userInfo = JSON.parse(localStorage.getItem(id));
           location.reload();
      },
      (error) => {
           console.log(error);
           this.message.create('html', error.message);
      }
    );
  }

  logout() {
    this.userInfo = null;
    this.afAuth.auth.signOut();
    this.router.navigate(['/auth']);
  }

  login(values){

        firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(
           (res) => {
                console.log(res);
                let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
                this.userInfo = JSON.parse(localStorage.getItem(id));
                this.message.html(`<h1>Loading</h1>`);
                this.router.navigate(['/pages']);
           },
           (error) => {
                console.log(error);
                this.message.create('html', error.message);
           }
    
        );
  }

  register(values) {
    this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password).then(
      (user) => {
      // Handle Errors here.
      user.updateProfile({
          displayName: values.nickname,
          photoURL: '/assets/img/singed.jpg'
      }).then(function() {
          // Update successful.
      }, function(error) {
          // An error happened.
      });
      user.sendEmailVerification().then( () => {
           this.message.create('html', 'Email is sent for verification and now login');
           let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
           this.userInfo = JSON.parse(localStorage.getItem(id));
           this.router.navigate(['/pages']);
      },
      (error) => {
           console.log(error);
           this.message.create('html', error.message);
      });

    });
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
}
