import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clickCounter : number = 0;
  name: string = "http://ddementiev0d1:8880"; 

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.name = this._http.getServerUrl ();
  }

  valueEntered(val) {
    console.log (`Value entered: ${val}`);
    this._http.setUrl (val);
  }

  countClick () {
    this.clickCounter ++;
  }

  setClasses () {
    let myClasses = {
      active: this.clickCounter > 4,
      notactive: this.clickCounter <= 4
    }
    return myClasses;
  }

}
