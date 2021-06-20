import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-shop-dashboard',
  templateUrl: './my-shop-dashboard.component.html',
  styleUrls: ['./my-shop-dashboard.component.css']
})
export class MyShopDashboardComponent implements OnInit {

  constructor(    private router: Router) { }

  ngOnInit(): void {
  }
}
