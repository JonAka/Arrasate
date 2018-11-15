import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    public navParams: NavParams) {
    /*   this.getAlbisteak();
      this.getAgenda(); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragePage');
    this.getEventItems();
    this.getNewsItems()
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
  getAlbisteak() {
    this.arrasateService.getAlbisteak().subscribe(res => {
      this.albisteList = res['items'];
      console.log("item: ", this.albisteList);
    })
  }
  getAgenda() {
    this.arrasateService.getAgenda().subscribe(res => {
      this.agendaList = res['items'];
    })
  }

}
