import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalConstants } from './../../common/global-constants';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})

export class CreateShopComponent implements OnInit {

  shopNameForm: FormGroup = new FormGroup({
    shopname: new FormControl("", [Validators.minLength(2)]),
  });

  get shopnameInput() {
    return this.shopNameForm.get("shopname");
  }

  title = GlobalConstants.siteName;
  loading = false;
  mobileQuery: MediaQueryList;
  errorMessage: string | undefined;
  value: any;

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
  }

  shouldEnableSubmit() {
    return (
      (this.shopnameInput && !this.shopnameInput.valid)
    );
  }

  async createShop() {
    this.loading = true;
    this.router.navigate(['shop/my-shop/dashboard']);
    this.loading = false;

  }
}
