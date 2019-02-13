import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { NewsdetailmodalPage } from '../newsdetailmodal/newsdetailmodal';
import { EventdetailmodalPage } from '../eventdetailmodal/eventdetailmodal';

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

  constructor(

    public arrasateService: ArrasateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private modalController: ModalController) { }

  ionViewDidLoad() {

    this.getEventItems();
    this.getNewsItems();

  }

  /* Gustoko agendako albisteak bistaratzeko  */
  getEventItems() {
    this.db.object('user/' + this.user + '/agenda/').valueChanges().subscribe(res => {
      if (res) {
        for (let agendkey of Object.keys(res)) {
          this.eventitem.push({ data: res[agendkey][0], firebase_id: agendkey })
        };
      }
    });
  }
  /* Gustoko albisteetako albisteak bistaratzeko  */
  getNewsItems() {
    this.db.object('user/' + this.user + '/albistea/').valueChanges().subscribe(res => {
      if (res) {
        for (let key of Object.keys(res)) {
          this.newsitem.push({ data: res[key][0], firebase_id: key })
          console.log("ITEM DATA : " , this.newsitem);
        };
      }
    });
  }

  /* Gustoko albisteak ezabatzeko  */
  removeNewsData(item) {
    const removeitem = this.db.list('user/' + this.user + '/albistea/' + item)
    removeitem.remove();

    let alert = this.alertCtrl.create({
      subTitle: 'EZABATUTA !',
      buttons: ['Ados']
    });
    this.navCtrl.pop();
    alert.present();

  }

  /* Gustoko agendako albisteak ezabatzeko */
  removeEventData(item) {
    console.log("ITEM :", item);
    const agend = this.db.object('/user/' + this.user + '/agenda/' + item);
    agend.remove();

    let alert = this.alertCtrl.create({
      subTitle: 'EZABATUTA !',
      buttons: ['Ados']
    });
    this.navCtrl.pop();
    alert.present();

  }
  openNewsModal(item_url) {
    let openNewsModal = this.modalController.create(NewsdetailmodalPage, { url: item_url['@id'] });
    openNewsModal.present();
  }
  openEventModal(item_url_event) {
    let openEventModal = this.modalController.create(EventdetailmodalPage, { url: item_url_event['@id'] });
    openEventModal.present();
  }
}
