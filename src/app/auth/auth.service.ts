import { Injectable } from '@angular/core';
import { Auth, API } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { Subject, Observable } from 'rxjs';
import { Hub, ICredentials } from '@aws-amplify/core';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean | undefined;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  constructor() {
    Hub.listen('auth',(data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
  }

  signIn(username: string, password: string):Promise<CognitoUser|any> {
    return new Promise((resolve,reject) => {
      Auth.signIn(username,password)
      .then((user: CognitoUser|any) => {
        this.loggedIn = true;
        resolve(user);
      }).catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

  socialSignIn(provider:CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }

  googleSocialSignIn():Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': CognitoHostedUIIdentityProvider.Google
    });
  }

  signUp(user: User): Promise<CognitoUser|any> {
    return Auth.signUp({
      "username": user.UserEmail,
      "password": user.Password,
      "attributes": {
        "email": user.UserEmail,
        "given_name": user.FirstName,
        "family_name": user.LastName,
        "phone_number": user.MobileCountryCode + user.MobileNumber,
        'custom:abn': user.Abn,  // custom attribute, not standard
        'custom:isSeller' : user.Seller
      }
    });
  }

  public async confirmSignUp(username: string, code: string) {
    try {
      return await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  public async getCurrentUserDetails() {
    try {
      const user = await Auth.currentUserInfo();
      const { attributes } = user;
      return attributes;
    } catch (error) {
      console.log('error getting user details', error);
    }
  }
}
