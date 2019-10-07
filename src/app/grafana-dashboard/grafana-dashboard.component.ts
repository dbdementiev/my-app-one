import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-grafana-dashboard',
  templateUrl: './grafana-dashboard.component.html',
  styleUrls: ['./grafana-dashboard.component.scss']
})
export class GrafanaDashboardComponent implements OnInit {

  dashboardUrl: string = "http://localhost:3333/dashboard/snapshot/Q0S22w4PMWyR02ZCNxoJMm7MkcWQjrNI";
  safeDashboardUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.safeDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl (this.dashboardUrl);
  }

}
