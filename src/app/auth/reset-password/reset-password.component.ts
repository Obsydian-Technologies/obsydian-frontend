import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { MediaMatcher } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Input() header!: string;
  @Output() authFlow = new EventEmitter<string>();

  email: any;
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required])
  });

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    passwordAgain: new FormControl("", [Validators.required, Validators.minLength(8)]),
    code: new FormControl('', [ Validators.required, Validators.minLength(3) ])
  });

  get emailInput() { return this.forgotPasswordForm.get('email'); }

  get codeInput() { return this.resetPasswordForm.get('code'); }

  get passwordInput() {
    return this.resetPasswordForm.get("password");
  }

  get passwordAgainInput() {
    return this.resetPasswordForm.get("password");
  }

  loading = false;
  user = new User();
  mobileQuery!: MediaQueryList;
  errorMessage: string | undefined;
  hide = true;
  CognitoUser: CognitoUser | undefined;
  resetCodeSent = false;
  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private notification: NotificationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
  }

  shouldEnableSubmit() {
    return (
      (this.emailInput && !this.emailInput.valid)
    );
  }

  shouldEnableResetSubmit() {
    return (
      (this.passwordInput && !this.passwordInput.valid) ||
      (this.passwordAgainInput && !this.passwordAgainInput.valid)
    );
  }

  async forgotPassword() {
    if(this.emailInput && this.emailInput.value){
    await Auth.forgotPassword(this.emailInput.value)
      .then((response: any) => {
        console.log(response);
        this.email = response.CodeDeliveryDetails.Destination;
        this.resetCodeSent = true;
      })
      .catch((error: any) => {
        console.log(error);
        this.notification.show(error.message);
      })
  }

}

async resetPassword() {
  if(this.passwordInput && this.passwordAgainInput && this.emailInput && this.codeInput){
      if(this.passwordInput.value === this.passwordAgainInput.value){
        await Auth.forgotPasswordSubmit(this.emailInput.value, this.codeInput.value, this.passwordInput.value)
          .then((response: any) => {
            console.log(response);
          })
          .catch((error: any) => {
            console.log(error);
            this.notification.show(error.message);
          })
      }else{
        this.notification.show('Passwords do not match');
      }
    }
}

async signIn() {
  this.authFlow.emit('signIn');
}

async signUp() {
  this.authFlow.emit('signUp');
}

}
