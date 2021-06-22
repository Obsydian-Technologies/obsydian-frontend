import { Resource } from './Resource';
import { Category } from './category';
export class Product extends Resource {
  id: string | undefined;
  title: string | undefined;
  price: string | undefined;
  categories: Category[];
  image: string | undefined;
  color: string | undefined;

  constructor(obj: any) {
    super();
    this.id = obj.id;
    this.title = obj.title;
    this.price = obj.metadata && obj.metadata.price ? obj.metadata.price : undefined;
    this.image = obj.metadata && obj.metadata.image.url ? obj.metadata.image.url : undefined;
    this.color = obj.metadata.color;
    this.categories = [];

    if (obj.metadata && obj.metadata.categories) {
      obj.metadata.categories.map((category: Category) => this.categories.push(new Category(category)));
    }
  }
}
