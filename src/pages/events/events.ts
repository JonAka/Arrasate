import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { EventdetailmodalPage } from '../eventdetailmodal/eventdetailmodal';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  agendaList;

  constructor(private modalController: ModalController, public navCtrl: NavController, public navParams: NavParams, public arrasateService: ArrasateService) {
    this.getAgenda();
  }
  openEventModal(item_url_event) {

    let openEventModal = this.modalController.create(EventdetailmodalPage, { url: item_url_event });
    openEventModal.present();

  }

  getAgenda() {
    this.arrasateService.getAgenda().subscribe(res => {
      this.agendaList = res['items'];
    })
  }
  doRefresh(refresher) {
    this.arrasateService.getAgenda().subscribe(res => {
      this.agendaList = res['items'];
      refresher.complete();
    })
  }


}
