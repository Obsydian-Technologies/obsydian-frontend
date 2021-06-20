import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { environment } from "src/environments/environment";
import { phoneNumberValidator } from 'src/app/validators/phone-validator';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Input() header: string = "Sign Up";
  @Output() authFlow = new EventEmitter<string>();
  @Input() seller: boolean = false;

  signupForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    phone: new FormControl("", [Validators.minLength(10), phoneNumberValidator]),
    fname: new FormControl("", [Validators.minLength(2)]),
    lname: new FormControl("", [Validators.minLength(2)]),
    abn: new FormControl("", [Validators.min(0)]),
    seller: new FormControl("", [Validators.min(0)])
  });

  get emailInput() {
    return this.signupForm.get("email");
  }
  get passwordInput() {
    return this.signupForm.get("password");
  }
  get fnameInput() {
    return this.signupForm.get("fname");
  }
  get lnameInput() {
    return this.signupForm.get("lname");
  }
  get phoneInput() {
    return this.signupForm.get("phone");
  }
  get abnInput() {
    return this.signupForm.get("abn");
  }
  get sellerInput() {
    return this.signupForm.get("seller");
  }

  loading = false;
  mobileQuery: MediaQueryList;
  user = new User();
  CognitoUser: CognitoUser | undefined;
  countryCode: string = "+61";
  errorMessage: string | undefined;
  hide = true;

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<SignUpComponent>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
  }

  getEmailInputError() {
    if (this.emailInput && this.emailInput.hasError("email")) {
      return "Please enter a valid email address.";
    }else if (this.emailInput && this.emailInput.hasError("required")) {
      return "An Email is required.";
    }else{
      return undefined
    }
  }

  getPasswordInputError() {
    if (this.passwordInput && this.passwordInput.hasError("required")) {
      return "A password is required.";
    }else{
      return undefined;
    }
  }

  shouldEnableSubmit() {
    return (
      (this.emailInput && !this.emailInput.valid) ||
      (this.passwordInput && !this.passwordInput.valid) ||
      (this.fnameInput && !this.fnameInput.valid) ||
      (this.lnameInput && !this.lnameInput.valid) ||
      (this.phoneInput && !this.phoneInput.valid)
    );
  }

  async createAccount() {
    this.loading = true;
    this.user.UserEmail = this.emailInput ? this.emailInput.value : undefined;
    this.user.Password = this.passwordInput ? this.passwordInput.value : undefined;
    this.user.FirstName = this.fnameInput ? this.fnameInput.value : undefined;
    this.user.LastName = this.lnameInput ? this.lnameInput.value : undefined;
    this.user.MobileNumber = this.phoneInput ? this.phoneInput.value : undefined;
    this.user.UserName = this.user.UserEmail ? this.user.UserEmail : undefined;
    this.user.MobileCountryCode = this.countryCode;
    this.user.Seller = this.sellerInput? this.sellerInput.value : undefined;

    if (this.user && this.user.UserName && this.user.Password && this.user.UserEmail && this.user.FirstName && this.user.LastName && this.user.MobileNumber && this.user.MobileCountryCode) {
      await this.authService
        .signUp(this.user)
        .then(data => {
          environment.confirm.email = this.user.UserEmail;
          environment.confirm.password = this.user.Password;
          this.CognitoUser = data;
          this.loading = false;
          this.notification.show('Account Created, Confirm your email address.');
          this.confirm();
        })
        .catch(error => {
          this.errorMessage = error.message;
          this.loading = false;
        });
    }

    this.loading = false;

  }

  async signIn() {
    this.authFlow.emit('Sign In');
  }

  async confirm() {
    this.authFlow.emit('confirm');
  }

  async close(){
    this.authFlow.emit('close');
    this.dialogRef.close('Closed AuthFlow');
  }
}

