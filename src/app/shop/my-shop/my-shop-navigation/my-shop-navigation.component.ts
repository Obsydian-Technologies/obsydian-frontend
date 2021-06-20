import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthComponent } from 'src/app/auth/auth.component';
import { MyShopProductsAddComponent } from '../my-shop-products/my-shop-products-add/my-shop-products-add.component';
@Component({
  selector: 'app-my-shop-navigation',
  templateUrl: './my-shop-navigation.component.html',
  styleUrls: ['./my-shop-navigation.component.css']
})
export class MyShopNavigationComponent{
  user: any;
  profile: any;
  avatar: any;
  loading = false;
  mobileQuery: MediaQueryList;
  numberOfNewNotifications = 0;
  private _mobileQueryListener: () => void;
  profile_image!: string;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public auth: AuthService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  async goToLandingPage(): Promise<void> {
    this.router.navigateByUrl('landing');
}

  async goToDashBoard(): Promise<void> {
      this.router.navigateByUrl('shop/my-shop/dashboard');
  }

  async goToMyProducts(): Promise<void> {
      // this.router.navigateByUrl('shop/my-shop/products');
  }

  async goToMyStoreSetup(): Promise<void> {
    this.router.navigateByUrl('shop/my-shop/shop-setup');
  }

  async goToHelpCenter(): Promise<void> {
    this.router.navigateByUrl('shop/my-shop/help-center');
  }

  async addProduct(){
    this.router.navigateByUrl('shop/my-shop/add-product');
    // const dialogRef = this.dialog.open(MyShopProductsAddComponent, {
    //   width: '500px',
    //   data: { },
    // });

    //   dialogRef.afterClosed().subscribe(result => {
    //     this.reloadHeader();
    //   });
  }

  async reloadHeader() {
    await this.auth.getCurrentUserDetails().then(async data => {
      this.user =  data;
      await Auth.currentAuthenticatedUser().then(async response => {
        this.profile = response;
        if ( this.profile.attributes['picture'] ) {
          this.avatar = this.profile.attributes['picture'];
          if(this.avatar){
            await Storage.get(this.avatar).then(response => {
              this.profile_image = response as string;
            })
            .catch(error => {
              console.log(error);
            });
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
  }

  async ngOnInit() {
    this.reloadHeader();
  }

  async reloadProfile() {
  }

  async loadNotifications() {
  }

  async logout() {
    await this.auth.signOut().then(data => {
      this.user = undefined;
      this.router.navigateByUrl('/landing');
    })
    .catch(error => {
          console.log(error);
    });
  }

}
