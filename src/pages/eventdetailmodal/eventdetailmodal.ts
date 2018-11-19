import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the EventdetailmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-eventdetailmodal',
  templateUrl: 'eventdetailmodal.html',
})
export class EventdetailmodalPage {

  agendaDetail;
  getEventUrl: string;
  items: any = [];
  key: string = 'items';
  isFavorite: boolean = false;

  constructor(public arrasateService: ArrasateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage) {

    this.getAgendaDetail(navParams.get('url'))
    this.getEventUrl = navParams.get('url');
    console.log("URL EVENT : ", this.getEventUrl);
  }

  getAgendaDetail(item_id) {

    this.arrasateService.getAgendaDetail(item_id).subscribe(res => {

      this.agendaDetail = res;

      console.log('ITEM: ', res);
    })
  }

  closeModal() {
    this.navCtrl.pop();
  }
  saveEventData() {

    this.storage.get(this.key).then(res => {
      if (res) {
        res.push(this.agendaDetail);
        this.storage.set(this.key, res);
      } else {
        this.storage.set(this.key, [this.agendaDetail]);
      }
      this.isFavorite = true;
    });
    let alert = this.alertCtrl.create({
      subTitle: 'GUSTOKOENETARA GEHITUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
  removeEventData(count) {
    this.storage.get(this.key).then(res => {
      res.splice(count, 1);
      this.storage.set(this.key, res).then(() => {
        this.isFavorite = false;
      });
    });
  }
}

