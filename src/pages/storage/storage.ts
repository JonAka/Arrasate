import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Observable } from 'rxjs';
/**
 * Generated class for the StoragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html',
})
export class StoragePage {
  itemEvent_list;
  itemNews_list;
  albisteList;
  agendaList;
  user = firebase.auth().currentUser.uid;
  test: Observable<any>;
  newsitem = [];
  toremove;
  eventitem = [];
  key: string;
  agendkey: string;
  constructor(public arrasateService: ArrasateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {

  }

  ionViewDidLoad() {

    this.getEventItems();
    this.getNewsItems();

  }
  getEventItems() {
    this.db.object('user/' + this.user + '/agenda/').valueChanges().subscribe(res => {
      if (res) {
        console.log("Event res : ", res);
        for (let agendkey of Object.keys(res)) {
          this.eventitem.push(res[agendkey][0])
          this.agendkey = agendkey;
        };
      }
    });

  }

  getNewsItems() {
    this.db.object('user/' + this.user + '/albistea/').valueChanges().subscribe(res => {
      if (res) {
        console.log("News res : ", res);
        for (let key of Object.keys(res)) {
          this.newsitem.push(res[key][0])
          this.key = key;
        };
      }

    });

  }
  removeNewsData() {
    const removeitem = this.db.list('user/' + this.user + '/albistea/' + this.key)

    removeitem.remove();

    let alert = this.alertCtrl.create({
      subTitle: 'EZABATUTA !',
      buttons: ['Ados']
    });
    alert.present();

  }


  removeEventData() {
    const agend = this.db.object('/user/' + this.user + '/agenda/' + this.agendkey);
    agend.remove();
    let alert = this.alertCtrl.create({
      subTitle: 'EZABATUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
}
