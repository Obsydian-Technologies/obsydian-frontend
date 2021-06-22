import { Resource } from './Resource';

export class Category extends Resource {
  id: string;
  title: string;
  isRoot: boolean;

  constructor(obj: any) {
    super();
    this.id = obj.id;
    this.title = obj.title;
    this.isRoot = obj.metadata ? obj.metadata.root : false;
  }
}
