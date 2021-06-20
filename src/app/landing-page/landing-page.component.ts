import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { LandingFixService } from './landing-fix.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy, AfterViewInit {
  loading = false;
  link = ' ';
  showDownloadApp = false;

  constructor(private titleService: Title, private fix: LandingFixService,) {
   }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  ngOnInit() {
    this.titleService.setTitle( 'Shop black products' )
    this.fix.addFix();

    let device = this.getMobileOperatingSystem();

    if(device == 'iOS'){
      this.showDownloadApp = true;
      this.link = 'https://apps.apple.com/za/app/afritasks/id1486473378';
    } else if(device == 'Android'){
      this.showDownloadApp = true;
      this.link = 'https://play.google.com/store/apps/details?id=com.afritasks.afritasks';
    }else{
      this.showDownloadApp = false;
      this.link = '';
    }
  }

  ngOnDestroy() {
    this.fix.removeFix();
  }

  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;

        // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
      }

      if (/android/i.test(userAgent)) {
          return "Android";
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) {
          return "iOS";
      }

      return "unknown";
  }
}
