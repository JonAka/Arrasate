import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StoragePage } from '../../pages/storage/storage';

import { TranslateService } from '@ngx-translate/core';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public isToggled: boolean;
  logoutMsg = "Saioa itxi";
  logeatuta: boolean;

  constructor(public auth: AuthProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    public translate: TranslateService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public arrasateService: ArrasateService, ) {
    this.isToggled = false;
    this.logeatuta = this.auth.logged;

    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.logeatuta = true;
      } else {
        this.logeatuta = false;
      }
    }); 
    console.log("logeatuta : ", this.afAuth.auth.currentUser);
  }

  logout() {
    this.auth.logout();
    let alert = this.alertCtrl.create({
      subTitle: "Saioa itxi duzu!",
      buttons: ["ados"]
    });
    alert.present();
  }
  openStorage() {
    this.navCtrl.push(StoragePage);
  }

  onSelectChange(selectedValue: any) {
    this.translate.setDefaultLang(selectedValue);
    this.storage.set('language', selectedValue).then(() => {
      this.arrasateService.refreshLanguage();
    });

  }
  public suscribeNoti(slug) {
    if (this.isToggled == true) {
      this.arrasateService
        .enableNotifications(slug)
        .then(data => {
          if (data) {
            let alert = this.alertCtrl.create({
              title: "OK",
              subTitle: "Notifications enabled correctly",
              buttons: ["OK"],

            });
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "Error enabling notifications.",
              buttons: ["OK"]
            });
            alert.present();
          }
        })
        .catch(data => {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Error enabling notifications.",
            buttons: ["OK"]
          });
          alert.present();
        });
    }
    if (this.isToggled == false) {
      this.arrasateService
        .disableNotifications(slug)
        .then(data => {
          if (data) {
            let alert = this.alertCtrl.create({
              title: "OK",
              subTitle: "Notifications disabled correctly",
              buttons: ["OK"]
            });
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "Error disabling notifications.",
              buttons: ["OK"]
            });
            alert.present();
          }
        })
        .catch(data => {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Error disabling notifications.",
            buttons: ["OK"]
          });
          alert.present();
        });
    }
  }

}
