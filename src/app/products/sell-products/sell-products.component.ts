import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AuthService } from 'src/app/auth/auth.service';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { CreateShopComponent } from 'src/app/shop/create-shop/create-shop.component';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {
    title = GlobalConstants.siteName;
    user: CognitoUser | undefined;
    profile: any;
    user_access_token = localStorage.getItem('access_token');
    loading = true;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    constructor(public dialog: MatDialog, private router: Router, changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      public auth: AuthService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      }

    async ngOnInit() {
      setTimeout(() => {
        this.loading = false;
      }, 50);
      await this.reloadComponent().then(response => {
        // If logged in and has shop then go straight to shop
        if(this.user && this.profile && this.profile.attributes['seller'] === 'true'){
          this.router.navigate(['/products/store']);
        }
      })
    }

    async reloadComponent() {
      await this.auth.getCurrentUserDetails().then(async data => {
        this.user =  data;
        await Auth.currentAuthenticatedUser().then(async (response: any) => {
          this.profile = response;
          // if ( this.profile.attributes['picture'] ) {
          // }
        })
        .catch(error => {
              console.log(error);
        });
      })
      .catch(error => {
            console.log(error);
      });
    }

    async openCreateShop() {
      this.loading = true;
      //   (<any>window).ga('send', 'event', {
      //     eventCategory: 'ButtonClicks',
      //     eventLabel: 'OpenCreateShopForm',
      //     eventAction: 'OpenCreateShopForm',
      //     eventValue: 1
      //   });

      setTimeout(async () => {
        await this.reloadComponent().then( responce => {
          if(this.user){
            this.router.navigateByUrl('/shop/create');
          }else{
            this.router.navigateByUrl('/auth/sign-up/sell');
          }
          this.loading = false;
        }).catch( error => {
          this.loading = false;
          console.log(error);
        });
      }, 1000);
      }
}
