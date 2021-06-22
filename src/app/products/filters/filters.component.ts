import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/models/product';
import { PriceFilter } from 'src/app/models/pricefilter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  public rootCategoryList: Map<Category, boolean> = new Map<Category, boolean>();
  public categoryList: Map<Category, boolean> = new Map<Category, boolean>();
  public colorList: Map<string, boolean> = new Map<string, boolean>();
  public priceList: Map<PriceFilter, boolean> = new Map<PriceFilter, boolean>();
  public productsList!: Product[];
  public categoriesList!: Category[];
  public priceFiltersList!: PriceFilter[];

  @Output() selectedFilters = new EventEmitter<string>();

  // constructor(private cosmicService: CosmicService) {}

  async ngOnInit(): Promise<void> {

    let obj = { id: "dssd", title: "Luc Belaire Light Up Fantôme Provence Sparkling Rosé Rare NV (6 Bottle Case)", metadata: { image: { url: "https://picsum.photos/300" } , price: "100", color: "red"  } }
    let obj2 = { id: "dssd", title: "Luc Belaire Light Up Fantôme Provence Sparkling Rosé Rare NV (6 Bottle Case)", metadata: { image: { url: "https://picsum.photos/300" } , price: "100", color: "blue"  } }

    let testProduct = new Product(obj)

    let testProduct2 = new Product(obj2)

    let testProduct3 = new Product(obj)

    let objCategory = {id: "1", title: "Women", metadata: {root: true}}

    let objCategory2 = {id: "2", title: "Men", metadata: {root: true}}

    let objCategory3 = {id: "3", title: "Kids", metadata: {root: true}}

    let objCategory4 = {id: "4", title: "Trousers", metadata: {root: false}}

    let objCategory5 = {id: "5", title: "Swimwear", metadata: {root: false}}

    let objCategory6 = {id: "6", title: "Shirts", metadata: {root: false}}

    let objPriceFilter1 = {id: "1", title: "$0 to $49", metadata: {min: "0", max: "49"}}

    let objPriceFilter2 = {id: "2", title: "$50 to $99", metadata: {min: "50", max: "99"}}

    let objPriceFilter3 = {id: "3", title: "$100 to $1000", metadata: {min: "100", max: "10000"}}

    let testCategory1 = new Category(objCategory);
    let testCategory2 = new Category(objCategory2);
    let testCategory3 = new Category(objCategory3);
    let testCategory4 = new Category(objCategory4);
    let testCategory5 = new Category(objCategory5);
    let testCategory6 = new Category(objCategory6);

    let testPriceFilter1 = new PriceFilter(objPriceFilter1);
    let testPriceFilter2 = new PriceFilter(objPriceFilter2);
    let testPriceFilter3 = new PriceFilter(objPriceFilter3);

    this.productsList = [testProduct, testProduct2, testProduct3];

    this.categoriesList = [testCategory1, testCategory2, testCategory3, testCategory4,testCategory5,testCategory6];

    this.priceFiltersList = [testPriceFilter1, testPriceFilter2, testPriceFilter3];

    // await forkJoin(this.categoriesList, this.productsList, this.priceFiltersList).subscribe(
    //   ([categories, products, priceFilters]) => {
        // categories
        this.categoriesList.forEach(cat => {
          cat.isRoot ? this.rootCategoryList.set(cat, false) : this.categoryList.set(cat, false);
        });

        // colors

        const colorSet = new Set<string>(); // Using a Set will automatically discard repeated colors

        this.productsList.forEach(p => {
          if(p.color){
            colorSet.add(p.color)
          }
        });

        colorSet.forEach(c => {
          this.colorList.set(c, false);
        });

        console.log(this.colorList);

        // prices
        this.priceFiltersList.forEach(pf => this.priceList.set(pf, false));

        console.log(this.priceList);

        this.updateSelectedFilters();
      // }
    // );
  }

  ///////////

  filterRootCategory(entry?: { key: Category; value: boolean }) {
    if(entry){
      this.rootCategoryList.set(entry.key, !entry.value);
    }

    this.updateSelectedFilters();
  }

  filterCategory(entry: { key: Category; value: boolean }) {
    this.categoryList.set(entry.key, !entry.value);
    this.updateSelectedFilters();
  }

  filterColor(entry: { key: string; value: boolean }) {
    this.colorList.set(entry.key, !entry.value);
    this.updateSelectedFilters();
  }

  filterPrice(entry: { key: PriceFilter; value: boolean }) {
    this.priceList.set(entry.key, !entry.value);
    this.updateSelectedFilters();
  }

  ///////////

  setCategoryFilterSelection(collection: Map<Category, boolean>, catInSelection: string[], catNotInSelection: string[]) {
    const inList: string[] = [];
    const ninList: string[] = [];
    collection.forEach((selected, category) => {
      if (selected) {
        inList.push(category.id);
      } else {
        ninList.push(category.id);
      }
    });

    /**
     * Only push elements if not all categories are either selected or unselected,
     * in that case we don't need filtering anything
     */
    if (inList.length !== 0 && ninList.length !== 0) {
      catInSelection.push(...inList);
      catNotInSelection.push(...ninList);
    }
  }

  setColorFilterSelection(collection: Map<string, boolean>): string[] {
    var inList: string[] = [];
    collection.forEach((value: boolean, key: string) => {
      if (value === true) {
        inList.push(key);
      }
    });
    return inList;
  }

  setPriceFilterSelection(collection: Map<PriceFilter, boolean>): number[][] {
    const inList: number[][] = [];

    collection.forEach((value: boolean, key: PriceFilter) => {
      if (value === true) {
        const range = [key.min, key.max];
        inList.push(range);
      }
    });

    return inList;
  }

  ///////////

  updateSelectedFilters() {
    // categories
    const catInSelection: string[] = [];
    const catNotInSelection: string[] = [];

    this.setCategoryFilterSelection(this.categoryList, catInSelection, catNotInSelection);
    this.setCategoryFilterSelection(this.rootCategoryList, catInSelection, catNotInSelection);

    // colors

    const colorInSelection: string[] = this.setColorFilterSelection(this.colorList);

    // price
    const pricesInSelection: number[][] = this.setPriceFilterSelection(this.priceList);

    // query
    let jsonObj: any;
    if (catInSelection.length > 0 && catNotInSelection.length > 0) {
      jsonObj['metadata.categories'] = {
        $in: catInSelection,
        $nin: catNotInSelection
      };
    }
    if (colorInSelection.length > 0) {
      jsonObj['metadata.color'] = { $in: colorInSelection };
    }

    if (pricesInSelection.length > 0) {
      jsonObj['$or'] = [];
      pricesInSelection.forEach(price => {
        jsonObj['$or'].push({
          $and: [
            {
              'metadata.price': {
                $gte: price[0]
              }
            },
            {
              'metadata.price': {
                $lte: price[1]
              }
            }
          ]
        });
      });

      // Introducing "$or" means we need to combine with an "$and" for the other conditions
      const auxObj = { $and: [] };

      // auxObj.$and.push(
      //   { "metadata.categories": jsonObj['metadata.categories'], 'metadata.color': jsonObj['metadata.color'] },
      //   { $or: jsonObj['$or'] }
      // );
      jsonObj = auxObj;
    }

    const query = encodeURIComponent(JSON.stringify(jsonObj));
    this.selectedFilters.emit(query);
  }
}
