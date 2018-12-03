import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Firebase } from "@ionic-native/firebase";
@Injectable()

export class ArrasateService {

  language = 'eu';
  section;


  constructor(private storage: Storage,
    public http: HttpClient,
    private firebase: Firebase) {
    this.refreshLanguage();
  }

  refreshLanguage() {
    this.storage.get('language').then((val) => {
      if (val) {
        this.language = val;
      }
    });
  }

  getUdalak() {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    if (this.language == 'eu') {
      this.section = 'udala';
      return this.http.get('https://www.arrasate.eus/' + this.language + '/' + this.section, { headers: headers })
    }
    if (this.language == 'es') {
      this.section = 'ayuntamiento';
      return this.http.get('https://www.arrasate.eus/' + this.language + '/' + this.section, { headers: headers })
    }
  }

  getAlbisteak() {

    let headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    if (this.language == 'eu') {
      this.section = 'albisteak';
      return this.http.get('https://www.arrasate.eus/' + this.language + '/' + this.section + '/@search?fullobjects=true&sort_order=reverse&sort_on=effective&b_size=25', { headers: headers })
    }
    if (this.language == 'es') {
      this.section = 'noticias';
      return this.http.get('https://www.arrasate.eus/' + this.language + '/' + this.section + '/@search?fullobjects=true&sort_order=reverse&sort_on=effective&b_size=25', { headers: headers })
    }
  }
  
  getAgenda() {

    let headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    return this.http.get('https://www.arrasate.eus/' + this.language + '/agenda/@search?fullobjects=true&sort_order=reverse&sort_on=effective&b_size=25', { headers: headers })
  }

  getAlbisteDetail(item_url) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    return this.http.get(item_url, { headers: headers })
  }

  getAgendaDetail(item_url_event) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    return this.http.get(item_url_event, { headers: headers })
  }

  public enableNotifications(slug): Promise<Boolean> {
    return this.firebase
      .subscribe(slug)
      .then(data => {
        return true;
      })
      .catch(data => {
        return false;
      });
  }

  public disableNotifications(slug): Promise<Boolean> {
    return this.firebase
      .unsubscribe(slug)
      .then(data => {
        return true;
      })
      .catch(data => {
        return false;
      });
  }
}