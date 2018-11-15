import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { NewsdetailmodalPage } from '../newsdetailmodal/newsdetailmodal';

import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';


@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  albisteList;

  constructor(private modalController: ModalController, public navCtrl: NavController, public navParams: NavParams, public arrasateService: ArrasateService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.getAlbisteak();

  }
  openNewsModal(item_url) {
    console.log("ITEM: ", item_url);
    let openNewsModal = this.modalController.create(NewsdetailmodalPage, { url: item_url });
    openNewsModal.present();
  }

  getAlbisteak() {
    this.arrasateService.getAlbisteak().subscribe(res => {
      this.albisteList = res['items'];
    })
  }
  doRefresh(refresher) {
    this.arrasateService.getAlbisteak().subscribe(res => {
      this.albisteList = res['items'];
      refresher.complete();
    })
  }

}
