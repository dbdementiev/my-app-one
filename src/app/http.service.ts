import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serverUrl: string = "http://ddementiev0d1.ptcnet.ptc.com:8880";
  private onServerSet = [];

  constructor(private http: HttpClient) { }

  myMethod () {
    return console.log ("What's up?");
  }

  setUrl (url) {
    if (url != this.serverUrl) {
      this.serverUrl = url;
      console.log (`HTTP client server url is set to ${this.serverUrl}`);
      if (this.onServerSet.length && this.serverUrl) {
        console.log ("Invoking onServerSet ()");
        for (const srvSet of this.onServerSet) {
          srvSet ();
        }
      }
    }
  }

  getData(suffix) {
    if (! suffix) { suffix = ""; }
    console.log ("Sending request to " + this.serverUrl + suffix);
    return this.http.jsonp (this.serverUrl + suffix, 'callback');
  }

  isServerSet () {
    return (this.serverUrl != "");
  }

  getServerUrl () {
    return this.serverUrl;
  }

  addOnserverSet (onset) {
    this.onServerSet.push (onset);
  }

  getServers () {
    return this.getData ("/add");
  }

  getMetrics () {
    return this.getData ("/metrics");
  }

  getBeer () {
    return this.http.get ('https://api.openbrewerydb.org/breweries');
  }
}
