import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user_picture = localStorage.getItem('profile_picture');
  user = JSON.parse(localStorage.getItem('user'))

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private imageSource = new BehaviorSubject(this.user_picture);
  currentImage = this.imageSource.asObservable();

  private userSource = new BehaviorSubject(this.user);
  currentUser = this.userSource.asObservable();

  private selectedTaskSource = new BehaviorSubject(false);
  currentSelectedTaskStatus = this.selectedTaskSource.asObservable();

  private numberOfNotificationsSource = new BehaviorSubject(0);
  currentnumberOfNotifications = this.numberOfNotificationsSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  updateUser(user: any) {
    this.userSource.next(user);
  }

  updateSelectedTaskStatus(status: any) {
    this.selectedTaskSource.next(status);
  }

  updateProfileImage(image: string) {
    this.imageSource.next(image);
  }

  updatenumberOfNotifications(numberOfNotifications: number) {
    this.numberOfNotificationsSource.next(numberOfNotifications);
  }
}
