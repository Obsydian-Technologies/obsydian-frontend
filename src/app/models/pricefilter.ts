export class PriceFilter {
  id: string;
  title: string;
  max: number;
  min: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.title = obj.title;
    this.max = obj.metadata.max;
    this.min = obj.metadata.min;
  }
}
