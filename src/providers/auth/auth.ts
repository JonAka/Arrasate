import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AuthProvider {
  itemsRef: any;
  items: any;
  user;
  loggedmail;
  logged: boolean = false;
  constructor(private afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {

  }

  // Registro de usuario
  registerUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref('/user')
          .child(newUser.user.uid)
          .set({ email: email });
      });
  }

  // Login de usuario
  loginUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        Promise.resolve(user)
        console.log("user", user.user.email);
        this.loggedmail = user.user.email;
        this.logged = true;
      })

      .catch(err => Promise.reject(err))
  }

  // Logout de usuario
  logout() {
    this.logged = false;
    return firebase.auth().signOut();
  }

  // Devuelve la session
  get Session() {

    return this.afAuth.authState;

  }
}


