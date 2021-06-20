import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit {

  @Input() header!: string;
  @Output() authFlow = new EventEmitter<string>();

  email = environment.confirm.email;
  confirmForm: FormGroup = new FormGroup({
    email: new FormControl({value: this.email, disabled: true}),
    code: new FormControl('', [ Validators.required, Validators.minLength(3) ])
  });

  get codeInput() { return this.confirmForm.get('code'); }

  loading = false;
  user = new User();
  mobileQuery!: MediaQueryList;
  password!: string;
  code!: string;
  errorMessage: string | undefined;
  hide = true;
  CognitoUser: CognitoUser | undefined;

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
    if (!this.email) {
      this.signUp();
    } else {
      Auth.resendSignUp(this.email);
    }
  }

  shouldEnableSubmit() {
    return (
      (this.codeInput && !this.codeInput.valid)
    );
  }

  async sendAgain() {
    await Auth.resendSignUp(this.email)
      .then(() => this.notification.show('A code has been emailed to you'))
      .catch(() => this.notification.show('An error occurred'));
  }

  async confirmCode() {
    if(this.codeInput){
    await Auth.confirmSignUp(this.email, this.codeInput.value)
      .then((data: any) => {
        console.log(data);
        if (data === 'SUCCESS' &&
            environment.confirm.email &&
            environment.confirm.password) {
          Auth.signIn(this.email, environment.confirm.password)
            .then(() => {
              this.authFlow.emit('close');
            }).catch((error: any) => {
              this.signIn();
            })
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.notification.show(error.message);
      })
  }
}

async signIn() {
  this.authFlow.emit('signIn');
}

async signUp() {
  this.authFlow.emit('signUp');
}

}
