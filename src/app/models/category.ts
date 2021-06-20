import { Resource } from './Resource';

export class Category extends Resource {
  id: string;
  slug: string;
  title: string;
  isRoot: boolean;

  constructor(obj: { _id: string; slug: string; title: string; metadata: { root: boolean; }; }) {
    super();
    this.id = obj._id;
    this.slug = obj.slug;
    this.title = obj.title;
    this.isRoot = obj.metadata ? obj.metadata.root : false;
  }
}
