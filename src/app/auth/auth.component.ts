import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  validateFormLogin: FormGroup;
  validateFormRegister: FormGroup;
  constructor(public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.authService.userInfo);
    this.validateFormLogin = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
    this.validateFormRegister = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      nickname         : [ null, [ Validators.required ] ]
    });
  }

// login
  test(){
    console.log(this.authService.userInfo);
  }
  login() {
    for (const i in this.validateFormLogin.controls) {
      this.validateFormLogin.controls[ i ].markAsDirty();
    }
    this.authService.login(this.validateFormLogin.value);
  }

  googleLogin() {
    this.authService.googleLogin();
  }

// register

  register() {
    for (const i in this.validateFormRegister.controls) {
      this.validateFormRegister.controls[ i ].markAsDirty();
    }
    this.authService.register(this.validateFormRegister.value);
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateFormRegister.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateFormRegister.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  getFormControl(name) {
    return this.validateFormRegister.controls[ name ];
  }
}
