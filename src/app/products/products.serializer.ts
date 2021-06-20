import { Product } from '../models/product';
// import { DateFormatPipe } from 'ngx-moment';
export class ProductsSerializer {

  user_name = localStorage.getItem('profile_name');
  user_picture = localStorage.getItem('profile_picture');
  // user = JSON.parse(localStorage.getItem('user'))
  user_access_token = localStorage.getItem('access_token');
  fromJson(json: any): Product {
      const product = new Product(json);
      product.Id = json.Id;
      return product;
  }

  toJson(product: Task): any {
    let CreatedAt: any;

    // CreatedAt = product.CreatedAt;
    // if (!product.id || !product.CreatedAt) {
      CreatedAt = Math.floor(Date.now() / 1000);
    // }

    return {
      // Id: product.id,
      CreatedAt: CreatedAt,
    };
  }
}
