import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
// import { CreateComponent } from '../task/create/create.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { AuthComponent } from '../auth/auth.component';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
// import { LoginComponent } from '../login/login.component';
// import { NotificationService } from '../task/../notifications/notification.service';
// import { UserService } from '../user/user.service';
// import { DataService } from '../services/data.service';
// import { Task } from '../models/task';
// import { TaskService } from '../task/task.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  // user = {emailVerified: false, uid: 0};
  user: any;
  profile: any;
  avatar: any;
  loading = false;
  mobileQuery: MediaQueryList;
  numberOfNewNotifications!: number;
  private _mobileQueryListener: () => void;
  profile_image!: string;
  // draftTask = new Task;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public auth: AuthService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    // public snackBar: MatSnackBar,
    // private notificationService: NotificationService,
    // private userService: UserService,
    // private data: DataService,
    // private taskService: TaskService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 737px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  async goToDashBoard(): Promise<void> {
    await this.reloadHeader();
    // (<any>window).ga('send', 'event', {
    //   eventCategory: 'ButtonClicks',
    //   eventLabel: 'obsidianLabelClicked',
    //   eventAction: 'obsidianLabelClicked',
    //   eventValue: 1
    // });
      this.router.navigateByUrl('/landing');
  }

  async openMyShop(){
    this.router.navigateByUrl('/shop/my-shop/dashboard');
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


    // if(this.user && this.auth.isTimedOut){
    //     this.auth.logout();
    // }
    // this.data.currentImage.subscribe(image => {
    //   this.user_picture = image;
    // });

    // this.data.currentUser.subscribe(user => {
    //   this.user = user;
    //   if (this.user) {
    //     this.reloadProfile();
    //     this.loadNotifications();
    //   } else {
    //     this.user_name = null;
    //     this.user_picture = null;
    //     this.user = null;
    //   }
    // });

    // if (this.user) {
    //   this.data.currentnumberOfNotifications.subscribe(currentnumberOfNotifications => {
    //     setTimeout(() => {
    //       this.loadNotifications();
    //     }, 1500);
    //   });
    //   this.finishDraft();
    // }

  }

  async reloadProfile() {
  //   await this.userService.getByUserEmail(this.user.email).subscribe(user => {
  //     if (!user) {
  //       // logout
  //     } else {
  //       this.user_picture = user.Picture
  //       const last_name_short = user.LastName ? user.LastName.charAt(0) + '.' : null;
  //       this.user_name = user.FirstName + ' ' + last_name_short;
  //       if (user.FirstName && user.LastName) {
  //         localStorage.setItem('profile_name',
  //           this.user_name);
  //       }
  //     }
  //   });

  }

  finishDraft() {
  //   // if theres a draft task save it into database
  //   if (localStorage.getItem('draft_task')) {
  //     this.draftTask = JSON.parse(localStorage.getItem('draft_task'));
  //     this.taskService.create(this.draftTask).subscribe(data => {
  //       if (data) {
  //         localStorage.removeItem('draft_task');
  //       }
  //     });
  //   }
  //   // open Task Create and get user to complete task
  //   if (this.draftTask && this.draftTask.Id) {
  //     const dialogRef = this.dialog.open(CreateComponent, {
  //       width: '500px',
  //       data: { name: 'test', animal: 'test', summary: this.draftTask.Summary, task: this.draftTask }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //     });
  //   }

  }


  async loadNotifications() {
  //   await this.notificationService.listbyuserid(this.user.sub).subscribe(notifications => {
  //     if (notifications) {
  //       this.numberOfNewNotifications = notifications.length;
  //     }
  //   });
  }

  openTaskCreate(): void {
  //   (<any>window).ga('send', 'event', {
  //     eventCategory: 'ButtonClicks',
  //     eventLabel: 'OpenPostTaskForm',
  //     eventAction: 'OpenPostTaskForm',
  //     eventValue: 1
  //   });
  //   localStorage.removeItem('search_on');
  //   localStorage.removeItem('last_search_term');
  //   localStorage.removeItem('last_search_results');


  //   // if theres a draft task save it into database
  //   if (localStorage.getItem('draft_task') && this.user) {
  //     this.draftTask = JSON.parse(localStorage.getItem('draft_task'));
  //     this.taskService.create(this.draftTask).subscribe(data => {
  //       if (data) {
  //         localStorage.removeItem('draft_task');
  //       }
  //     });
  //   }
  //   // open Task Create and get user to complete task
  //   if (this.draftTask && this.draftTask.Id) {
  //     const dialogRef = this.dialog.open(CreateComponent, {
  //       width: '500px',
  //       data: { name: 'test', animal: 'test', summary: this.draftTask.Summary, task: this.draftTask }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.draftTask = null;
  //       console.log('The dialog was closed');
  //     });
  //   } else {
  //     const dialogRef = this.dialog.open(CreateComponent, {
  //       width: '500px',
  //       data: { name: 'test', animal: 'test', summary: null, task: null }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //     });
  //   }
  }

  openSignIn(): void {
  //   (<any>window).ga('send', 'event', {
  //     eventCategory: 'ButtonClicks',
  //     eventLabel: 'obsidianSignInClick',
  //     eventAction: 'obsidianSignInClick',
  //     eventValue: 1
  //   });
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '500px',
      data: { header: 'Sign In', authFlow: 'Sign In' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadHeader();
    });
  }

  openSignUp(): void {
    //   (<any>window).ga('send', 'event', {
    //     eventCategory: 'ButtonClicks',
    //     eventLabel: 'obsidianSignUpClick',
    //     eventAction: 'obsidianSignUpClick',
    //     eventValue: 1
    //   });
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '500px',
      data: { header: 'Sign Up', authFlow: 'Sign Up' },
    });

      dialogRef.afterClosed().subscribe(result => {
        this.reloadHeader();
      });
    }

  openBrowseTasks(): void {
  //   (<any>window).ga('send', 'event', {
  //     eventCategory: 'ButtonClicks',
  //     eventLabel: 'BrowseTasks',
  //     eventAction: 'BrowseTasks',
  //     eventValue: 1
  //   });
  //   this.data.updateSelectedTaskStatus(false);
  //   localStorage.removeItem('search_on');
  //   localStorage.removeItem('last_search_term');
  //   localStorage.removeItem('last_search_location');
  //   localStorage.removeItem('last_search_location_name');
  //   localStorage.removeItem('last_search_price');
  //   localStorage.removeItem('last_search_tasktype');
  //   localStorage.removeItem('last_search_results');
  //   localStorage.removeItem('selected_browse_task');
  //   localStorage.removeItem('selected_my_task');
  //   localStorage.removeItem('last_search_lat');
  //   localStorage.removeItem('last_search_lng');
  //   localStorage.removeItem('last_search_distance');
  //   localStorage.removeItem('last_price_max');
  //   localStorage.removeItem('last_price_min');
  //   localStorage.removeItem('selected_my_task');
  //   localStorage.removeItem('last_task_status');
  //   localStorage.removeItem('last_location_type');

  //   if (localStorage.getItem('selected_browse_task')) {
  //     this.router.navigateByUrl('/tasks');
  //   } else if ((this.router.url.indexOf('/tasks') === 0)) {
  //     this.router.navigateByUrl('/tasks/browse');
  //   } else {
  //     this.router.navigateByUrl('/tasks/browse');
  //   }
  }
  openMyTasks(): void {
  //   (<any>window).ga('send', 'event', {
  //     eventCategory: 'ButtonClicks',
  //     eventLabel: 'MyTasks',
  //     eventAction: 'MyTasks',
  //     eventValue: 1
  //   });
  //   this.data.updateSelectedTaskStatus(false);
  //   localStorage.removeItem('search_on');
  //   localStorage.removeItem('last_search_term');
  //   localStorage.removeItem('last_search_location');
  //   localStorage.removeItem('last_search_location_name');
  //   localStorage.removeItem('last_search_price');
  //   localStorage.removeItem('last_search_tasktype');
  //   localStorage.removeItem('last_search_results');
  //   localStorage.removeItem('selected_browse_task');
  //   localStorage.removeItem('selected_my_task');
  //   localStorage.removeItem('last_location_type');
  //   this.router.navigateByUrl('/my-tasks/' + this.user_name);
  }

  async logout() {
    // (<any>window).ga('send', 'event', {
    //   eventCategory: 'ButtonClicks',
    //   eventLabel: 'LogOut',
    //   eventAction: 'LogOut',
    //   eventValue: 1
    // });
    // this.user_name = null;
    // this.user_picture = null;
    // this.user = null;
    // this.auth.logout();
    await this.auth.signOut().then(data => {
      this.user = undefined;
      this.router.navigateByUrl('/landing');
    })
    .catch(error => {
          console.log(error);
    });
  }
}
