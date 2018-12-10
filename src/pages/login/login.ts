import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { email: '', password: '' };
  logged: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,
    public alertCtrl: AlertController) {

  }

  signin() {
    this.auth.registerUser(this.user.email, this.user.password)
      .then((user) => {
        // El usuario se ha creado correctamente
        let alert = this.alertCtrl.create({
          subTitle: 'ERABILTZAILEA ERREGISTRATUA',
          buttons: ['Ados']
        });
        alert.present();
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          subTitle: 'Ez duzu emaila/pasahitza formatu zuzenean sartu edo emaila erregistratua dago',
          buttons: ['Ados']
        });
        alert.present();
      })

  }
  enterWithoutLogin() {

    this.navCtrl.setRoot(HomePage);
  }
  login() {
    this.auth.loginUser(this.user.email, this.user.password).then((user) => {
      let alert = this.alertCtrl.create({
        subTitle: 'Ongi etorri, ' + this.user.email,
        buttons: ['Ados']
      });
      alert.present();

      this.navCtrl.setRoot(HomePage);
      console.log("USER: ", this.user.email);
      if (this.auth.loggedmail == this.user.email) {
        this.logged = true;
      }
    }
    )
      .catch(err => {
        let alert = this.alertCtrl.create({
          subTitle: 'Emaila edo pasahitza ez da zuzena.',
          buttons: ['Ados']
        });
        alert.present();
      })
  }




}