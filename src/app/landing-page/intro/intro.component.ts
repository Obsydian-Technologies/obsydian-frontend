import { Component, OnInit } from '@angular/core';
// import {MatDialog} from '@angular/material';
// import {CreateComponent } from '../../task/create/create.component';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  user: any;
  profile: any;
  // user_access_token = localStorage.getItem('access_token');
  loading = true;
  mobileQuery: MediaQueryList;
  value = '';
  private _mobileQueryListener: () => void;
  constructor(public dialog: MatDialog, private router: Router, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, public auth: AuthService,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    }

  async ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 50);

    await this.reloadComponent();
  }

  async reloadComponent() {
    await this.auth.getCurrentUserDetails().then(async response => {
      this.user =  response;
    })
    .catch(error => {
          console.log(error);
    });
  }

  openBrowseTasks(): void {
    (<any>window).ga('send', 'event', {
      eventCategory: 'ButtonClicks',
      eventLabel: 'BrowseTasksFromGetStarted',
      eventAction: 'BrowseTasksFromGetStarted',
      eventValue: 1
    });
    localStorage.removeItem('search_on');
    localStorage.removeItem('last_search_term');
    localStorage.removeItem('last_search_location');
    localStorage.removeItem('last_search_location_name');
    localStorage.removeItem('last_search_price');
    localStorage.removeItem('last_search_tasktype');
    localStorage.removeItem('last_search_results');
    localStorage.removeItem('selected_browse_task');
    localStorage.removeItem('selected_my_task');
    if (localStorage.getItem('selected_browse_task')) {
      this.router.navigateByUrl('/tasks');
    } else if ((this.router.url.indexOf('/tasks') === 0)) {
      this.router.navigateByUrl('/tasks/browse');
    } else {
      this.router.navigateByUrl('/tasks/browse');
    }
  }

  // openTaskCreate(category, summary): void {
  //   (<any>window).ga('send', 'event', {
  //     eventCategory: 'ButtonClicks',
  //     eventLabel: 'OpenPostTasksFromIntro',
  //     eventAction: 'OpenPostTasksFromIntro-' + category,
  //     eventValue: 1
  //   });
  //   // if (this.user_access_token && this.user) {
  //     if(true){
  //     const dialogRef = this.dialog.open(CreateComponent, {
  //       width: '500px',
  //        data: {name: 'test', animal: 'test', summary: summary}
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //     });
  //   }
  // }

}
