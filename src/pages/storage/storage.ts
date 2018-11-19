import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { Storage } from '@ionic/storage';

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
  constructor(public arrasateService: ArrasateService,
    private storage: Storage,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    /*   this.getAlbisteak();
      this.getAgenda(); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragePage');
    this.getEventItems();
    this.getNewsItems();

  }
  getEventItems() {
    this.storage.get('items').then(res => {
      this.itemEvent_list = res;
      console.log("ITEM_LIST: ", this.itemEvent_list);
    })
  }

  getNewsItems() {
    this.storage.get('albisteItem').then(res => {
      this.itemNews_list = res;
      console.log("ITEM_LIST: ", this.itemNews_list);
    })
  }
  removeNewsData(count) {
    this.storage.get('albisteItem').then(res => {
      res.splice(count, 1);
      this.storage.set('albisteItem', res).then(() => {
        this.getNewsItems();
      });
      let alert = this.alertCtrl.create({
        subTitle: 'EZABATUTA !',
        buttons: ['Ados']
      });
      alert.present();
    });
  }

  removeEventData(count) {
    this.storage.get('items').then(res => {
      res.splice(count, 1);
      this.storage.set('items', res).then(() => {
        this.getEventItems();
      });
      let alert = this.alertCtrl.create({
        subTitle: 'EZABATUTA !',
        buttons: ['Ados']
      });
      alert.present();
    });
  }
  /*  getAlbisteak() {
     this.arrasateService.getAlbisteak().subscribe(res => {
       this.albisteList = res['items'];
       console.log("item: ", this.albisteList);
     })
   }
   getAgenda() {
     this.arrasateService.getAgenda().subscribe(res => {
       this.agendaList = res['items'];
     })
   } */

}
