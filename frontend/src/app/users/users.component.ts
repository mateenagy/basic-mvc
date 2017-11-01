import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // tslint:disable-next-line:no-trailing-whitespace
  
  public users = [];
  // Registration
  public rForm: FormGroup;
  public user: any;
  public edit = false;
  private id: number;
  public loading = true;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.rForm = this.fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'full_name': [null, Validators.required]
    });
  }

  public ngOnInit() {
    this.getUser();
  }

  public getUser() {
    this.http.get('/api/users')
    .subscribe(
      data => {
        this.users = data['users'];
      },
      error => console.log('Something went wrong'),
      () => this.loading = false
    );
  }

  public addUser(user) {
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
      response => console.log('Sikeres hozzáadás'),
      error => console.log('Error: ' + error),
      () => {
        this.getUser();
        this.rForm.reset();
      }
    );
  }

  public setEdit(user) {
    if (this.edit === true) {
      this.rForm.get('username').setValue(user.username);
      this.rForm.get('email').setValue(user.email);
      this.rForm.get('full_name').setValue(user.full_name);
      this.id = user.id;
    } else {
      this.rForm.reset();
    }
  }

  public editUser(user) {
    const body = {
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name
      };
    this.http.post('/api/updateUser/' + this.id, body, {
      responseType: 'text',
      headers: new HttpHeaders().set('Content-type', 'application/json')
    })
    .subscribe(
      response => console.log('Sikeres update'),
      error => console.log('Error: ' + error),
      () => {
        this.getUser();
        this.rForm.reset();
        this.edit = false;
      }
    );
  }

  public deleteUser(id) {
    console.log(id);
    this.http.post('/api/deleteUser/' + id, id, {
      responseType: 'text',
      headers: new HttpHeaders().set('Content-type', 'application/json')
    }).subscribe(
      response => console.log('user deleted'),
      error => console.log('Error: ' + error),
      () => this.getUser()
    );
  }

}
