import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  validateForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  login() {
    this.authService.login();
  }
}
