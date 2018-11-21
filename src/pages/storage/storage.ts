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
  newsitem;
  eventitem;
  constructor(public arrasateService: ArrasateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragePage');
    this.getEventItems();
    this.getNewsItems();

  }
  getEventItems() {
    this.db.object('user/'+this.user+ '/agenda/url').valueChanges().subscribe(res => {
      this.eventitem = res;
      console.log("RES: ", this.eventitem);
    });
  }

  getNewsItems() {
    // this.test = this.db.list('/user/' + this.user + '/albistea/url').valueChanges();
    this.db.object('user/'+this.user+ '/albistea/url').valueChanges().subscribe(res => {
      this.newsitem = res;
      console.log("RES: ", this.newsitem);
    });


  }
  removeNewsData() {
    const albi = this.db.object('/user/' + this.user + '/albistea');
      albi.remove();
      let alert = this.alertCtrl.create({
        subTitle: 'EZABATUTA !',
        buttons: ['Ados']
      });
      alert.present();
    
  }

  removeEventData() {
    const agend = this.db.object('/user/' + this.user + '/agenda');
    agend.remove();
    let alert = this.alertCtrl.create({
      subTitle: 'EZABATUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
}
