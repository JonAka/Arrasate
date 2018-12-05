import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
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
  idkey;
  isFavorite: boolean = false;
  key: string = 'albisteItem';
  item;
  users;
  error;
  user;
  url;
  uid;
  logeatuta: boolean;
  albikey: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public arrasateService: ArrasateService,
    public auth: AuthProvider,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.logeatuta = true;
      } else {
        this.logeatuta = false;
      }
    });

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
    this.user = firebase.auth().currentUser.uid;
    this.albikey = this.db.object('/user/' + this.user + '/albistea').valueChanges();
    const itemRef = this.db.list('/user/' + this.user + '/albistea');

    if (this.user) {
      console.log(".", this.user);
      itemRef.push([this.albisteDetail]).then(ref => {
        this.idkey = ref.key;
        console.log("ref", this.idkey);
      });


    }
    this.isFavorite = true;
    let alert = this.alertCtrl.create({
      subTitle: 'GUSTOKOENETARA GEHITUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
  removeNewsData() {
    this.user = firebase.auth().currentUser.uid;
    const albi = this.db.object('/user/' + this.user + '/albistea/' + this.idkey);
    albi.remove();
    this.isFavorite = false;
  }

}
