import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {

  }

  // Registro de usuario
  registerUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.user.uid)
          .set({ email: email });
      });
  }

  // Login de usuario
  loginUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => Promise.resolve(user))
      .catch(err => Promise.reject(err))
  }

  // Logout de usuario
  logout() {
    return firebase.auth().signOut();
  }

  // Devuelve la session
  get Session() {
    return this.afAuth.authState;
  }

}

