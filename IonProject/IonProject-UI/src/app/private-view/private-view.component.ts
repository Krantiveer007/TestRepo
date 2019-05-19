import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-private-view',
  templateUrl: './private-view.component.html',
  styleUrls: ['./private-view.component.css']
})
export class PrivateViewComponent implements OnInit {
  logoutAction: string = 'LOGOUT';
  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.http.changeLoginStatus('Logged In');
  }
  onLogout() {
    this.logoutAction = 'Logging Out';
    this.http.changeLoginStatus('Logging Out');
    setTimeout(() => {
      this.router.navigate(['welcomePage/login'], { skipLocationChange: true });
    }, 3000);
  }
}
