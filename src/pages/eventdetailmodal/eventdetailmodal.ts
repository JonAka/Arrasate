import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { AngularFireDatabase } from 'angularfire2/database';


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
  user = firebase.auth().currentUser.uid;
  constructor(public arrasateService: ArrasateService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: HttpClient,
    public db: AngularFireDatabase) {

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

    if (this.user) {

      console.log(".", this.user);
      const agend = this.db.object('/user/' + this.user + '/agenda');
      agend.update({ url: [this.agendaDetail] });

    }
    this.isFavorite = true;
    let alert = this.alertCtrl.create({
      subTitle: 'GUSTOKOENETARA GEHITUTA !',
      buttons: ['Ados']
    });
    alert.present();
  }
  removeEventData() {

    const agend = this.db.object('/user/' + this.user + '/agenda');
    agend.remove();
    this.isFavorite = false;
  }
}

