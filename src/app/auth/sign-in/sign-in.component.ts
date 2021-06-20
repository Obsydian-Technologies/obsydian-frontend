import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { environment } from "src/environments/environment";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../auth.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Input() header: string = "Sign In";
  @Output() authFlow = new EventEmitter<string>();

  signinForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  get emailInput() {
    return this.signinForm.get("email");
  }
  get passwordInput() {
    return this.signinForm.get("password");
  }

  loading = false;
  user = new User();
  mobileQuery!: MediaQueryList;
  password!: string;
  email!: string;
  errorMessage: string | undefined;
  hide = true;
  CognitoUser: CognitoUser | undefined;

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialogRef: MatDialogRef<SignInComponent>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
  }

  shouldEnableSubmit() {
    return (
      (this.emailInput && !this.emailInput.valid) ||
      (this.passwordInput && !this.passwordInput.valid)
    );
  }

  async signInWithGoogle(){
    this.authService.googleSocialSignIn().then( response =>{
      console.log(response)
    }).catch( error => {
      console.log(error);
    })
  }

  async signIn() {
    this.loading = true;
    this.user.UserEmail = this.emailInput ? this.emailInput.value : undefined;
    this.user.Password = this.passwordInput ? this.passwordInput.value : undefined;

    if (this.user && this.user.UserEmail && this.user.Password){
      await this.authService.signIn(this.user.UserEmail,this.user.Password).then(data => {
        this.CognitoUser = data;
        this.loading = false;
        this.authFlow.emit('close');
        this.dialogRef.close('Closed AuthFlow');
        // check to see if the user has an account in dynamodb, if not then create it
      })
      .catch(error => {
        this.errorMessage = error.message;
        this.loading = false;
        switch (error.code) {
          case "UserNotConfirmedException":
            environment.confirm.email = this.user.UserEmail;
            environment.confirm.password = this.user.Password;
            this.confirm();
            break;
          case "UsernameExistsException":
            this.errorMessage = error.message;
            break;
        }
      });
    }
    this.loading = false;
  }

  async signUp() {
    this.authFlow.emit('Sign Up');
  }

  async confirm() {
    this.authFlow.emit('confirm');
  }

  async resetPassword() {
    this.authFlow.emit('reset');
  }
}
