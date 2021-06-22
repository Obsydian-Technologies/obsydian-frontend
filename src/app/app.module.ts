import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { FaqsComponent } from './admin/faqs/faqs.component';
import { PrivacyPolicyComponent } from './admin/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './admin/terms-and-conditions/terms-and-conditions.component';
import { SellProductsComponent } from './products/sell-products/sell-products.component';
import { GetAppComponent } from './landing-page/get-app/get-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AvatarComponent } from './auth/profile/avatar/avatar.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { IntroComponent } from './landing-page/intro/intro.component'
import { LandingFixService } from './landing-page/landing-fix.service';
import { ShopComponent } from './shop/shop.component';
import { MyShopComponent } from './shop/my-shop/my-shop.component';
import { CreateShopComponent } from './shop/create-shop/create-shop.component';
import { MyShopNavigationComponent } from './shop/my-shop/my-shop-navigation/my-shop-navigation.component';
import { MyShopDashboardComponent } from './shop/my-shop/my-shop-dashboard/my-shop-dashboard.component';
import { MyShopProductsComponent } from './shop/my-shop/my-shop-products/my-shop-products.component';
import { MyShopSetupComponent } from './shop/my-shop/my-shop-setup/my-shop-setup.component';
import { MyShopProductsAddComponent } from './shop/my-shop/my-shop-products/my-shop-products-add/my-shop-products-add.component';
import { MyShopProductsEditComponent } from './shop/my-shop/my-shop-products/my-shop-products-edit/my-shop-products-edit.component';
import { PublicProfileComponent } from './users/public-profile/public-profile.component';
import { MyShopProductsListComponent } from './shop/my-shop/my-shop-products/my-shop-products-list/my-shop-products-list.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { ActionsComponent } from './products/actions/actions.component';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { FiltersComponent } from './products/filters/filters.component';
import { MinNavigationComponent } from './navigation/min-navigation/min-navigation.component';
import { ProductListComponent } from './products/product-list/product-list.component';
/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    LandingPageComponent,
    ServiceListComponent,
    FooterComponent,
    FaqsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    SellProductsComponent,
    GetAppComponent,
    CreateShopComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmCodeComponent,
    ProfileComponent,
    AuthComponent,
    ResetPasswordComponent,
    AvatarComponent,
    IntroComponent,
    ShopComponent,
    MyShopComponent,
    MyShopNavigationComponent,
    MyShopDashboardComponent,
    MyShopProductsComponent,
    MyShopSetupComponent,
    MyShopProductsAddComponent,
    MyShopProductsEditComponent,
    PublicProfileComponent,
    MyShopProductsListComponent,
    CategoriesComponent,
    ActionsComponent,
    ProductListingComponent,
    FiltersComponent,
    MinNavigationComponent,
    ProductListComponent
  ],
  entryComponents: [AuthComponent, SignUpComponent, SignInComponent, MyShopProductsAddComponent, MyShopProductsEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    AmplifyUIAngularModule,
    HttpClientModule
  ],
  providers: [LandingFixService],
  bootstrap: [AppComponent]
})
export class AppModule { }
