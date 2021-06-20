import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-shop-products-list',
  templateUrl: './my-shop-products-list.component.html',
  styleUrls: ['./my-shop-products-list.component.css']
})
export class MyShopProductsListComponent implements OnInit {

  public productList: Product[] | undefined;
  public user: User | undefined;

  constructor() { }

  ngOnInit(): void {
    // forkJoin(this.cosmicService.getCategories(), this.cosmicService.getProducts(), this.cosmicService.getPriceFilters()).subscribe(
    //   ([categories, products, priceFilters]) => {
    //     // categories
    //     categories.forEach((cat: { isRoot: any; }) => {
    //       cat.isRoot ? this.rootCategoryList.set(cat, false) : this.categoryList.set(cat, false);
    //     });

    //     // colors

    //     const colorSet = new Set<string>(); // Using a Set will automatically discard repeated colors
    //     products.forEach((p: { color: string; }) => colorSet.add(p.color));
    //     colorSet.forEach(c => {
    //       this.colorList.set(c, false);
    //     });

    //     // prices
    //     priceFilters.forEach((pf: any) => this.priceList.set(pf, false));

    //     this.updateSelectedFilters();
    //   }
    // );


  }

}
