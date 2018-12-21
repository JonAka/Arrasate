import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
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
  key: string = 'items';
  isFavorite: boolean = false;
  logeatuta: boolean;
  user;
  agendakey: Observable<any>;
  constructor(public arrasateService: ArrasateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: HttpClient,
    public auth: AuthProvider,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public storage: Storage) {

    this.getAgendaDetail(navParams.get('url'))
    this.getEventUrl = navParams.get('url');
    console.log("URL EVENT : ", this.getEventUrl);
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.logeatuta = true;
      } else {
        this.logeatuta = false;
      }
    });
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
    this.user = firebase.auth().currentUser.uid;
    this.agendakey = this.db.list('/user/' + this.user + '/agenda').snapshotChanges();
    const itemRef = this.db.list('/user/' + this.user + '/agenda');
    if (this.user) {
      console.log(".", this.user);
      itemRef.push([this.agendaDetail]).then(ref => {
        this.agendakey = ref.key;
        console.log("ref", this.agendakey);
        this.storage.set('Agenda Detail', this.agendakey);

      });


    }
    this.isFavorite = true;



    const toast = this.toastCtrl.create({
      message: 'Gustokoenetara gehituta  !',
      duration: 3200
    });
    toast.present();
  }

  removeEventData() {
    this.user = firebase.auth().currentUser.uid;
    const agend = this.db.object('/user/' + this.user + '/agenda/' + this.agendakey);
    agend.remove();
    this.isFavorite = false;

  }
}

