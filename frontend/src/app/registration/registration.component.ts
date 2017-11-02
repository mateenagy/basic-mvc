import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public rForm: FormGroup;
  constructor(private http: HttpClient,
              public fb: FormBuilder,
              public router: Router,
              public auth: AuthService) {
    this.rForm = this.fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'full_name': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
  }
  public register(user) {
    this.auth.register(user, this.rForm);
    this.router.navigate(['login']);
  }

}
