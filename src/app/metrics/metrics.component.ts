import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  metrics: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    if (this._http.isServerSet ()) {
      this.onServerSet ();
    }
    const that = this;
    this._http.addOnserverSet (function () { that.onServerSet (); });
  }

  addMetricDescription (obj: Object, metricName: string, descr: string) {
    console.log ("    Adding metric description: name=" + metricName + "  descr=" + descr);
    let metric = obj [metricName];
    if (! metric) {
      console.log ("   Creating metric with name " + metricName);
      metric = {"name" : metricName};
      obj [metricName] = metric;
    }
    metric.description = descr;
  }

  addMetricValue (obj: Object, metricName: string, valueName:string, val: string) {
    console.log ("    Adding metric value: name=" + metricName + "  valueName=" + valueName + "    val=" + val);
    let metric = obj [metricName];
    if (! metric) {
      if (metricName.endsWith ("_count")) {
        metricName = metricName.substr (0, metricName.length - "_count".length);
      }
      else if (metricName.endsWith ("_sum")) {
        metricName = metricName.substr (0, metricName.length - "_sum".length);
      }
      metric = obj [metricName];
      if (! metric) {
        console.log ("   Creating metric with name " + metricName);
        metric = {"name" : metricName};
        obj [metricName] = metric;
      }
    }
    if (! metric.values) {
      metric.values = [];
    }
    metric.values.push ({"name": valueName, "value": val});
  }

  addMetricType (obj: Object, metricName: string, type: string) {
    console.log ("    Adding metric type: name=" + metricName + "  type=" + type);
    let metric = obj [metricName];
    if (! metric) {
      console.log ("   Creating metric with name " + metricName);
      metric = {"name" : metricName};
      obj [metricName] = metric;
    }
    metric.type = type;
  }
  parseMetricsData (data :string): Object {
    console.log ("Parsing metrics data");
    let obj = {};
    const lines = data.split ("\n");
    let lineNum = 1;
    for (const line of lines) {
      if (line == "") { continue; }
      console.log (`{\n    ${lineNum++}: ${line}`);
      const parts = line.split (" ");
      if (parts.length < 2) {
        continue;
      }
      if (parts [0] == "#") {
        if (parts [1] == "HELP") {
          const name = parts [2];
          const descr = parts.slice (3).join (" ");
          this.addMetricDescription (obj, name, descr);
        }
        else if (parts [1] == "TYPE") {
          const name = parts [2];
          const type = parts [3];
          this.addMetricType (obj, name, type);
        }
      }
      else {
        const name = parts[0].split ("{")[0];
        const val = parts [parts.length-1];
        this.addMetricValue (obj, name, parts[0], val);
      }
      console.log ("}");
    }
    let arr = [];
    for (const metricName in obj) {
        arr.push (obj[metricName]);
    }
    return arr;
  }

  onServerSet () {
    this._http.getMetrics ().subscribe (data => {
            //console.log("Got metrics data: " + JSON.stringify(data, null, 4));
      this.metrics = this.parseMetricsData (data[0]);
      console.log ("Got metrics: " + JSON.stringify(this.metrics, null, 4));
    });
  }
}

