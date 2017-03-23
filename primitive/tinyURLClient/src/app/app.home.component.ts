import { Component } from '@angular/core';
import { Router } from "@angular/router"; // this service is used for redirection
import { CommServerService } from './services/service.url';

export class UrlSet {
  url_l : string;
  url_s : string;
}

@Component({
  selector: 'app-home',
  templateUrl: './app.home.component.html',
})

export class HomeComponent {
  constructor(
      private commServerService: CommServerService,
      private router: Router) { }

  url_l : string;
  url_s : string;

  onSubmit() {
    this.commServerService.getshorturl(this.url_l)
      .subscribe(
        result => {
          this.url_s = result.url_s;
          this.router.navigateByUrl('client/urls/' + this.url_s); // redirection
        }
      );
  }
}
