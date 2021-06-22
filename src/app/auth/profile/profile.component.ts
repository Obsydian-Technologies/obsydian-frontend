import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthComponent } from '../auth.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.email ]),
    phone: new FormControl('', [ Validators.minLength(10) ]),
    fname: new FormControl('', [ Validators.minLength(2) ]),
    lname: new FormControl('', [ Validators.minLength(2) ])
  });
  currentAvatarUrl: string | undefined;
  avatar: string | undefined;
  deleteAvatar = false;
  profile:any = {};
  user: CognitoUser | undefined;
  loading = false;
  userId: string | undefined;
  countryCode: string = "+61";

  get emailInput() { return this.profileForm.get('email'); }
  get fnameInput() { return this.profileForm.get('fname'); }
  get lnameInput() { return this.profileForm.get('lname'); }
  get phoneInput() { return this.profileForm.get('phone'); }

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService ,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.loading = true;
    await this.getUserInfo().then(response => {
    }).catch(error => {
      console.log(error);
    });
  }

  async showLoader(){
    this.loading = true;
  }

  async getUserInfo() {
    await Auth.currentUserInfo().then(async response => {
      this.profile = response;
      this.userId = this.profile.username;
      await Auth.currentAuthenticatedUser().then(async response => {
        this.user = response;
        if ( this.profile.attributes['picture'] ) {
          this.avatar = this.profile.attributes['picture'];
          if(this.avatar){
            await Storage.get(this.avatar).then(response => {
              this.currentAvatarUrl = response as string;
            })
            .catch(error => {
              console.log(error);
            });
          }
        }
        if(this.fnameInput && this.lnameInput && this.phoneInput){
          this.fnameInput.setValue(this.profile.attributes['given_name']);
          this.lnameInput.setValue(this.profile.attributes['family_name']);
          this.phoneInput.setValue(this.profile.attributes['phone_number']);

          if(this.profile.attributes['country_code']){
            this.countryCode = this.profile.attributes['country_code']
          }
        }
      })
      .catch(error => {
            console.log(error);
      });
    })
    .catch(error => {
          console.log(error);
    });
    this.loading = false;
  }

  getEmailInputError() {
    if (this.emailInput && this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }else if (this.emailInput && this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }else{
      return undefined;
    }
  }

  signOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/landing']))

      const dialogRef = this.dialog.open(AuthComponent, {
        width: '500px',
        data: { header: 'Sign In', authFlow: 'Sign In' },
      });

      dialogRef.afterClosed().subscribe(result => {

      });
  }

  async onAvatarUploadComplete(data: any) {
    this.avatar = data.key;

      try {
        let attributes = {
          'picture': ''
        };
        if (this.avatar) {
          attributes['picture'] = this.avatar;
        }
        await Auth.updateUserAttributes(this.user,attributes).then(data => {
          this.notification.show('Your profile picture has been updated.');
        })
        .catch(error => {
          this.notification.show(error.message);
        });

      } catch (error) {
        this.notification.show(error.message);
      }
      this.deleteAvatar = false;
      this.loading = false;
  }

  onAvatarRemove() {
    this.avatar = undefined;
    this.currentAvatarUrl = undefined;
    this.deleteAvatar = true;
  }

  onAvatarPicked(){
  }

  async editProfile() {
    this.loading = true;
    if(this.fnameInput && this.lnameInput && this.phoneInput){
      try {
        let attributes = {
          'given_name': this.fnameInput.value,
          'family_name': this.lnameInput.value,
          'phone_number': this.phoneInput.value,
          'picture': ''
        };
        if (this.avatar) {
          attributes['picture'] = this.avatar;
        }
        await Auth.updateUserAttributes(this.user,attributes).then(data => {
          if (!this.avatar && this.deleteAvatar) {
            if(this.user){
              this.user.deleteAttributes(["picture"],(error) => {
                if (error) console.log(error);
                this.notification.show('Your profile information has been updated.');
              });
            }
          } else {
            this.notification.show('Your profile information has been updated.');
          }
        })
        .catch(error => {
          this.notification.show(error.message);
        });

      } catch (error) {
        this.notification.show(error.message);
      }
    }
    this.loading = false;
  }
}
