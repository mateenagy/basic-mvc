import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public rForm: FormGroup;
  public loggedIn = false;
  public user: any;
  public error: string;
  constructor(private http: HttpClient,
              public fb: FormBuilder,
              public auth: AuthService,
              public router: Router) {
    this.rForm = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
    auth.tokenLogin().then((response) => {
      this.user = response;
    });
   }

  ngOnInit() {
  }

  public logIn(user) {
    this.auth.login(user, this.rForm);
    this.router.navigate(['']);
  }

}
