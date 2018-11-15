import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { email: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,
    public alertCtrl: AlertController) {
  }

  signin() {
    this.auth.registerUser(this.user.email, this.user.password)
      .then((user) => {
        // El usuario se ha creado correctamente
        let alert = this.alertCtrl.create({
          title: 'ERABILTZAILEA ERREGISTRATUA',
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
  login() {
    this.auth.loginUser(this.user.email, this.user.password).then((user) => {
      let alert = this.alertCtrl.create({
        subTitle: 'Ongi etorri, ' + this.user,
        buttons: ['Ados']
      });
      alert.present();
      this.navCtrl.push(HomePage);
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