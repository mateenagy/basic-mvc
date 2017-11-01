import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedIn = false;
  public user: any;
  constructor(private http: HttpClient,
              public fb: FormBuilder,
              public auth: AuthService) {
    auth.tokenLogin().then((response) => {
      console.log(response);
    });
  }

  public ngOnInit() {
  }


}
