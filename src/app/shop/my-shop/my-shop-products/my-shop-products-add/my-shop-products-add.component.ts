import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from 'aws-amplify';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-my-shop-products-add',
  templateUrl: './my-shop-products-add.component.html',
  styleUrls: ['./my-shop-products-add.component.css']
})

export class MyShopProductsAddComponent implements OnInit {

  @ViewChild('stepper')  myStepper: MatStepper | undefined;

  productDetailsForm: FormGroup = new FormGroup({
    sku: new FormControl('', [Validators.minLength(2)]),
    category: new FormControl('', [Validators.minLength(2)]),
    title: new FormControl('', [Validators.minLength(2)]),
    description: new FormControl('', [Validators.minLength(2)]),
    shortDescription: new FormControl('', [Validators.minLength(2)]),
    price: new FormControl('', [Validators.minLength(2)]),
    specialPrice: new FormControl('', [Validators.minLength(2)]),
  });

  additionalInfoForm: FormGroup = new FormGroup({
    stock: new FormControl('', [Validators.minLength(2)]),
    stockAvailability: new FormControl('', [Validators.minLength(2)]),
    taxClass: new FormControl('', [Validators.minLength(2)]),
    weight: new FormControl('', [Validators.minLength(2)]),
    allowedPerCustomer: new FormControl('', [Validators.minLength(2)]),
    colour: new FormControl('', [Validators.minLength(2)]),
  });

  profile: any = {};
  user: CognitoUser | undefined;
  loading = false;

  get skuInput() { return this.productDetailsForm.get('sku'); }
  get categoryInput() { return this.productDetailsForm.get('category'); }
  get titleInput() { return this.productDetailsForm.get('title'); }
  get descriptionInput() { return this.productDetailsForm.get('description'); }
  get shortDescriptionInput() { return this.productDetailsForm.get('shortDescription'); }
  get priceInput() { return this.productDetailsForm.get('price'); }
  get specialPriceInput() { return this.productDetailsForm.get('specialPrice'); }
  get stockInput() { return this.additionalInfoForm.get('stock'); }
  get stockAvailabilityInput() { return this.additionalInfoForm.get('stockAvailability'); }
  get taxClassInput() { return this.additionalInfoForm.get('taxClass'); }
  get weightInput() { return this.additionalInfoForm.get('weight'); }
  get allowedPerCustomerInput() { return this.additionalInfoForm.get('allowedPerCustomer'); }
  get colourInput() { return this.additionalInfoForm.get('colour'); }

  mobileQuery: MediaQueryList | undefined;
  private _mobileQueryListener: (() => void) | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  async ngOnInit() {
    this.loading = true;
    this.loading = false;
  }

  goBack() {
    if(this.myStepper){
      this.myStepper.previous();
    }
  }

  goForward() {
    if(this.myStepper){
      this.myStepper.next();
    }
  }

  async save() {
    this.loading = true;
    // if(this.fnameInput && this.lnameInput && this.phoneInput){
    try {
      let attributes = {
        // 'given_name': this.fnameInput.value,
        // 'family_name': this.lnameInput.value,
        // 'phone_number': this.phoneInput.value,
        'picture': ''
      };
      await Auth.updateUserAttributes(this.user, attributes).then(data => {
        if (this.user) {
          this.user.deleteAttributes(["picture"], (error) => {
            if (error) console.log(error);
            this.notification.show('Your profile information has been updated.');
          });
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
    this.loading = false;
  }
}
