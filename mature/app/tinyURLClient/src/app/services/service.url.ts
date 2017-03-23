// this file is a custom service to communicate with backend
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UrlSet } from '../app.home.component';

@Injectable()
export class CommServerService {
  urlApi = '/api/v1/urls';
  constructor(private http: Http) { }

  getshorturl(url_l: string): Observable<UrlSet> {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.urlApi, {url_l: url_l}, options)
      .map(this.extractUrlSet);
  }

  getlongurl(url_s: string): Observable<UrlSet> {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.get(`${this.urlApi}/${url_s}`, options)    // url concat method
      .map(this.extractUrlSet);
  }

  getstats(url_s: string, tar: string): Observable<any> {
    return this.http.get(`${this.urlApi}/${url_s}/${tar}`)
      .map(this.extractStats);
  }

  extractUrlSet(res: Response) {
    let body = res.json();
    return body as UrlSet || {};
  }

  extractStats(res: Response) {
    //TODO: parse stats based on number and object
    // if (typeof res == 'number'){
    //   return res;
    // } else {
    //   return res.json();
    // }
    return res.json();
  }
}
