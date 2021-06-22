import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import{ GlobalConstants } from './common/global-constants';
import { onAuthUIStateChange, CognitoUserInterface, AuthState} from '@aws-amplify/ui-components'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GlobalConstants.siteName;
  allowHeader = true;
  allowShopHeader = false;
  allowMinHeader = false;
  loadApp = false;

  user: CognitoUserInterface | undefined;
  authState!: AuthState;

  constructor(private ref: ChangeDetectorRef,  private router: Router, private route: ActivatedRoute,
    private matIconRegistry: MatIconRegistry, public dialog: MatDialog, private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        `obs_location`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/location_svg.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `obs_location_blue`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/location_svg_blue.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `reply`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/reply_svg.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `obs_logo_white`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/obsydian_logo_white_solid.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `obs_logo_white_label`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/logo_transparent_white.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `offer`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/offer.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `money`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/money.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `release-payment`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/release-payment.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `request-payment`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/request-payment.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `skill`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/skill.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `credit-card`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/credit-card.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `post-a-task`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/post_a_task.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `get-it-done`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/get_it_done.svg')
      );

      this.matIconRegistry.addSvgIcon(
        `review-offers`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/review_offers.svg')
      );

          // check the route
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        if (this.route.root.firstChild) {
          this.allowHeader = this.route.root.firstChild.snapshot.data['allowHeader'];
          this.allowShopHeader = this.route.root.firstChild.snapshot.data['allowShopHeader'];
          this.allowMinHeader = this.route.root.firstChild.snapshot.data['allowMinHeader'];
        }
        // (<any>window).ga('set', 'page', event.urlAfterRedirects);
        // (<any>window).ga('send', 'pageview');
      }
    });

      this.router.navigate(['/landing']);
      setTimeout(() => {
        this.loadApp = true;
      }, 500);

    }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })

  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    return onAuthUIStateChange;
  }
}
