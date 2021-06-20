import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResourceService } from './../services/resource.service';
import { Product } from '../models/product';
import { ProductsSerializer } from './products.serializer';
@Injectable({
  providedIn: 'root'
})
  export class ProductsService extends ResourceService<Product> {
    constructor(httpClient: HttpClient) {
      super(
        httpClient,
        environment.productsApiUrl,
        'products',
        new ProductsSerializer());
    }

    getProducts(){

    }

    getCategories(){

    }

    getPriceFilters(){

    }
  }
