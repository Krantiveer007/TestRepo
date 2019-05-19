import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.component.html'
})
export class WelcomeViewComponent implements OnInit {

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.http.changeLoginStatus('Not Logged In');
  }
  onLogin() {
    this.router.navigate(['welcomePage/login'], { skipLocationChange: true })
  }
}
