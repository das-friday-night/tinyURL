import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // used to get info from url
import { CommServerService } from './services/service.url';

// grab DOM info from <canvas baseChart></canvas> in html
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
// for update rendering chart. since ng2-charts don't support
// dynamic chart rendering, so we need manually update the chart
import { ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './app.details.component.html',
})

export class DetailsComponent {
  constructor(private route: ActivatedRoute, private commServer: CommServerService) {}

  url_l : string;
  url_s : string;
  clicks : number = 0;
  time: string;

  lineChartDataSets:Array<any> = [{data: [], label: 'click'}];
  lineChartLabels = [];
  lineChartType = 'line';


  ngOnInit(){
    // subscribe activetedRoute service
    this.route.params.subscribe(
      params => {
        this.url_s = params['short'];
        // subscribe CommServerService service
        this.commServer.getlongurl(this.url_s).subscribe(
          result => {this.url_l = result.url_l;}
        );

        this.commServer.getstats(this.url_s, 'click').subscribe(
          result => {this.clicks = result;}
        );

        // render chart
        this.renderChart(this.url_s, "referrer", "pie");
        this.renderChart(this.url_s, "countryOrRegion", "doughnut");
        this.renderChart(this.url_s, "platform", "polarArea");
        this.renderChart(this.url_s, "browser", "radar");
      }
    )
  }

  renderChart(url_s: string, tar: string, chartType: string) {
    this[chartType+'ChartData'] = [];
    this[chartType+'ChartLabels'] = [];
    this[chartType+'ChartType'] = chartType;

    const that = this;
    this.commServer.getstats(url_s, tar).subscribe(
      results => {
        results.forEach(function(item){
          that[chartType+'ChartData'].push(item.count);
          that[chartType+'ChartLabels'].push(item._id);
        });
        that.updateChart();
      },
      error => console.log(error)
    );
  }

  getTime(time: string): void{
    this.time = time;
    // reset all array to hold new data
    this.lineChartDataSets[0].data = [];
    this.lineChartLabels = [];

    const that = this;
    this.commServer.getstats(this.url_s, time).subscribe(
      results => {
        results.forEach(function(item){
          let legend = '';
          if(time === 'hour'){
            if(item._id.hour < 10){
              item._id.hour = '0' + item._id.hour;
            }
            if(item._id.minutes < 10) {
              item._id.minutes = '0' + item._id.minutes;
            }
            legend = item._id.hour + ':' + item._id.minutes;
          }
          if (time === 'day') {
            legend = item._id.hour + ':00';
          }
          if (time === 'month') {
            legend = item._id.month + '/' + item._id.day;
          }
          that.lineChartLabels.push(legend);
          that.lineChartDataSets[0].data.push(item.count);
        });
        that.updateChart();
      },
      error => console.log(error)
    );
  }


  @ViewChildren (BaseChartDirective) charts: QueryList<BaseChartDirective>;
  private updateChart(): void{
    this.charts.forEach( chart => {
      chart.ngOnChanges({});
    });
  }

}
