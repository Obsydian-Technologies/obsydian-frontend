import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  public productList: Product[] | undefined;
  public user: User | undefined;
  profile: any;
  loading = true;
  mobileQuery: MediaQueryList | undefined;
  private _mobileQueryListener: (() => void) | undefined;

  // constructor(private cosmicService: CosmicService, private userService: UserService) { }

  constructor(public dialog: MatDialog, private router: Router, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auth: AuthService){

  }

  // ngOnInit(): void {

    // this.userService.user$.subscribe(user => {
    //   this.user = user;
    // });
    // this.cosmicService.getProducts().subscribe(products => (this.productList = products));

  // }

  async ngOnInit() {

    let obj = { _id : "dssd", slug : "sds", title : "100", price : "100"}

    let testProduct = new Product(obj)

    let testProduct2 = new Product(obj)

    let testProduct3 = new Product(obj)

    setTimeout(() => {
      this.loading = false;
    }, 50);
    await this.reloadComponent().then(response => {
      this.productList = [ testProduct, testProduct2, testProduct3 ];
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

}
