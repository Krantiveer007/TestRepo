import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginStatus: string;
  constructor(private http: HttpService) {
    this.http.currentLoginStatusObservable.subscribe((status) => {
      this.loginStatus = status;
    });
  }
}
