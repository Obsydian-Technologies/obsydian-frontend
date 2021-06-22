import { Product } from '../models/product';
// import { DateFormatPipe } from 'ngx-moment';
export class ProductsSerializer {

  fromJson(json: any): Product {
      const product = new Product(json);
      product.id = json.id;
      return product;
  }

  toJson(product: Product): any {
    let createdAt: any;

    createdAt = Math.floor(Date.now() / 1000);

    return {
      id: product.id,
      createdAt: createdAt,
    };
  }
}
