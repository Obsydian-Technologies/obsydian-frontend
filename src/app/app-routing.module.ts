import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { TermsAndConditionsComponent } from './admin/terms-and-conditions/terms-and-conditions.component';
import { FaqsComponent } from './admin/faqs/faqs.component';
import { PrivacyPolicyComponent } from './admin/privacy-policy/privacy-policy.component';
import { SellProductsComponent } from './products/sell-products/sell-products.component';
import { UnauthGuard } from './auth/unauth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MyShopComponent } from './shop/my-shop/my-shop.component';
import { MyShopDashboardComponent } from './shop/my-shop/my-shop-dashboard/my-shop-dashboard.component';
import { MyShopProductsComponent } from './shop/my-shop/my-shop-products/my-shop-products.component';
import { MyShopSetupComponent } from './shop/my-shop/my-shop-setup/my-shop-setup.component';
import { MyShopProductsAddComponent } from './shop/my-shop/my-shop-products/my-shop-products-add/my-shop-products-add.component';
import { CreateShopComponent } from './shop/create-shop/create-shop.component';
import { PublicProfileComponent } from './users/public-profile/public-profile.component';
import { MyShopProductsListComponent } from './shop/my-shop/my-shop-products/my-shop-products-list/my-shop-products-list.component';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    data: { allowHeader: true, allowShopHeader: false }
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [UnauthGuard],
    data: { allowHeader: true, allowShopHeader: false, allowMinHeader: true  }
  },
  {
    path: 'auth/sign-in',
    component: SignInComponent,
    data: { allowHeader: false, allowShopHeader: false, allowMinHeader: true }
  },
  {
    path: 'auth/sign-up',
    component: SignUpComponent,
    data: { allowHeader: false, allowShopHeader: false, allowMinHeader: true  }
  },
  {
    path: 'auth/sign-up/:state',
    component: SignUpComponent,
    data: { allowHeader: false, allowShopHeader: false, allowMinHeader: true  }
  },
  {
    path: 'auth/reset-password',
    component: ResetPasswordComponent,
    data: { allowHeader: false, allowShopHeader: false, allowMinHeader: true  }
  },
  {
    path: 'auth/confirm-code',
    component: ConfirmCodeComponent,
    data: { allowHeader: false, allowShopHeader: false, allowMinHeader: true  }
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: true, allowShopHeader: false }
  },
  {
    path: 'shop/my-shop',
    component: MyShopComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: false, allowShopHeader: true }
  },
  {
    path: 'shop/create',
    component: CreateShopComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: true }
  },
  {
    path: 'shop/my-shop/dashboard',
    component: MyShopDashboardComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: false, allowShopHeader: true }
  },
  {
    path: 'shop/my-shop/products',
    component: MyShopProductsComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: false, allowShopHeader: true }
  },
  {
    path: 'shop/my-shop/shop-setup',
    component: MyShopSetupComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: false, allowShopHeader: true }
  },
  {
    path: 'shop/my-shop/add-product',
    component: MyShopProductsAddComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: false, allowShopHeader: true }
  },
  {
    path: 'shop/my-shop/list-products',
    component: MyShopProductsListComponent,
    canActivate: [AuthGuard],
    data: { allowHeader: false, allowShopHeader: true }
  },
  {
    path: 'products',
    component: ProductListingComponent,
    data: { allowHeader: true, allowShopHeader: false }
  },
  {
    path: 'public-profile/:profileid',
    component: PublicProfileComponent,
    data: { allowHeader: true, allowShopHeader: false }
  },
  {
    path: 'services',
    component: ServiceListComponent,
    data: { allowHeader: true, allowShopHeader: false }
  },
  {
    path: 'terms',
    component: TermsAndConditionsComponent,
    data: { allowHeader: true, allowShopHeader: false }
  },
  { path: 'faqs', component: FaqsComponent, data: { allowHeader: true } },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    data: { allowHeader: true, allowShopHeader: false }
  },
  {
    path: 'sell-products',
    component: SellProductsComponent,
    data: { allowHeader: true, allowShopHeader: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
