import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  brews: Object;
  servers: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    /*
    this._http.getBeer ().subscribe (data => {
      this.brews = data;
      console.log ("Got brews: " + this.brews);
    });
    */
    if (this._http.isServerSet ()) {
      this.onServerSet ();
    }
    const that = this;
    this._http.addOnserverSet (function () { that.onServerSet (); });
  }

  onServerSet () {
    this._http.getServers ().subscribe (data => {
      console.log ("Got servers: " + JSON.stringify(data, null, 4));
      this.servers = data[0].result;
    });
  }

}
