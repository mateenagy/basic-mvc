import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public rForm: FormGroup;
  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.rForm = this.fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'full_name': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  public register(user) {
    const body = {
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name
      };
    this.http.post('/api/addUser', body, {
      responseType: 'text',
      headers: new HttpHeaders().set('Content-type', 'application/json')
    })
    .subscribe(
      res => {},
      error => console.log('Error: ' + error),
      () => {
        this.rForm.reset();
      }
    );
  }

}
