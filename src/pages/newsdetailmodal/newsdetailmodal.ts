import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
//import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the NewsdetailmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newsdetailmodal',
  templateUrl: 'newsdetailmodal.html',
})
export class NewsdetailmodalPage {

  albisteDetail;
  items: any[];
  isFavorite:boolean = false;
  key: string = 'albisteItem';

  constructor(private storage: Storage,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public arrasateService: ArrasateService
    /*public http: HttpClient*/) {

    this.getAlbistedetail(navParams.get('url'));
  }
  closeModal() {
    this.navCtrl.pop();
  }

  getAlbistedetail(item_url) {
    this.arrasateService.getAlbisteDetail(item_url).subscribe(res => {
      this.albisteDetail = res;

      console.log('ITEM: ', item_url);

    })
  }
  saveNewsData() {

    this.storage.get(this.key).then(res => {
      if (res) {
        res.push(this.albisteDetail);
        this.storage.set(this.key, res);
      } else {
        this.storage.set(this.key, [this.albisteDetail]);
      }
      this.isFavorite = true;
    });
    let alert = this.alertCtrl.create({
      subTitle: 'GUSTOKOENETARA GEHITUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
  removeNewsData(count){
    this.storage.get('albisteItem').then(res => {
      res.splice(count, 1);
      this.storage.set('albisteItem', res).then(()=>{
        this.isFavorite=false;
      });
});

}
}
