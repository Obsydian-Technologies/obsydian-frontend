import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  @Input() product: Product | undefined;

  viewProduct() {
    this.increaseInterest(1);
  }

  addProductToCart() {
    this.increaseInterest(2);
  }

  buyProduct() {
    this.increaseInterest(3);
  }

  increaseInterest(weight: number) {
    // const user: User = this.userService.getSessionUser();
    // this.product.categories.forEach((category: Category) => {
    //   user.increaseInterest(category, weight);
    // }, this);

    // this.userService.setSessionUser(user);
    // this.cosmicService.updateUser(user).subscribe();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
