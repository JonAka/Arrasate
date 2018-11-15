import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
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
  isFavorite = false;

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
    });
    let alert = this.alertCtrl.create({
      title: 'GUSTOKOENETARA GEHITUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
  removeEventData() {
    return this.storage.get(this.key).then(res => {
      if (res) {
        var index = res.indexOf(this.agendaDetail);
        res.splice(index, 1);
        return this.storage.set(this.key, res);
      }
    });
  }
}

