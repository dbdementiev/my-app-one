import LogRocket from 'logrocket';
import { Component } from '@angular/core';

LogRocket.init ('ed936j/dan_test');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prometheus-monitor-app';
  grafanaDashboardUrl = "http://localhost:3333/dashboard/snapshot/h3xEmCnfy8S4F7k0GoINyfwBlSSwnYUi";
}
