import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
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
  isFavorite: boolean = false;
  key: string = 'albisteItem';
  item;
  users;
  error;
  url;
  user = firebase.auth().currentUser.uid;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public arrasateService: ArrasateService,
    public db: AngularFireDatabase
    /*public http: HttpClient*/) {

    this.getAlbistedetail(navParams.get('url'));
  }
  closeModal() {
    this.navCtrl.pop();
  }

  getAlbistedetail(item_url) {
    this.arrasateService.getAlbisteDetail(item_url).subscribe(res => {
      this.albisteDetail = res;
      this.url = item_url;
      console.log('ITEM: ', item_url);

    })
  }
  saveNewsData() {

    
    if (!this.user) {
      console.log("ERROR", this.error);
    }
    else {
      console.log(".", this.user);
      const albi = this.db.object('/user/' + this.user + '/albistea');
      albi.update({ url: this.albisteDetail });
    }
    this.isFavorite = true;
    let alert = this.alertCtrl.create({
      subTitle: 'GUSTOKOENETARA GEHITUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
  removeNewsData() {
    const albi = this.db.object('/user/' + this.user + '/albistea');
      albi.remove();
      this.isFavorite = false;
  }

}
