import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ArrasateService } from '../../providers/arrasate-service/arrasate-service';
import { NewsPage } from '../news/news';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage({
  name: 'home',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  udalakList;
  data;
  newsImage;
  itemsRef: any;
  items: any;
  user;
  error = "error";


  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public arrasateService: ArrasateService) {
    this.getUdalak();
    this.getNewsImage();
  }


  getUdalak() {
    this.arrasateService.getUdalak().subscribe(res => {
      this.udalakList = res;
      this.data = this.udalakList['text']['data'];
    })
  }

  getNewsImage() {
    this.arrasateService.getAlbisteak().subscribe(res => {
      this.newsImage = res['items'];
    })
  }
  openNews() {
    this.navCtrl.push(NewsPage);
  }

  doRefresh(refresher) {
    this.arrasateService.getUdalak().subscribe(res => {
      this.udalakList = res;
      this.data = this.udalakList['text']['data'];
      this.arrasateService.getAlbisteak().subscribe(res => {
        this.newsImage = res['items'];
      })
      refresher.complete();
    })
  }

}
