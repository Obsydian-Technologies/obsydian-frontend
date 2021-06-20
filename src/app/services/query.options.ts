export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
  }

  export class QueryOptions implements QueryBuilder {
    public pageNumber: number;
    public pageSize: number;
    public active: string;
    public text: string;
    public lat: number;
    public lng: number;
    public distance: string;
    public price_max: number;
    public price_min: number;
    public vicinity: string;
    public task_status: string;
    public location_type: string;
    public locationLabel: string;
    public priceLabel: string;
    public taskTypeLabel: string;
    public toDoType: string;


    constructor() {
      this.pageNumber = 1;
      this.pageSize = 10000;
    }

    clear() {
      this.pageNumber = 1;
      this.pageSize = 10000;
      this.text = null;
      this.active = null;
      this.lat = null;
      this.lng = null;
      this.distance = null;
      this.price_max = null;
      this.price_min = null;
      this.vicinity = null;
      this.task_status = null;
      this.location_type = null;
    }

    toQueryMap() {
      const queryMap = new Map<string, string>();
      queryMap.set('pageNumber', `${this.pageNumber}`);
      queryMap.set('pageSize', `${this.pageSize}`);
      if (this.active) {
        queryMap.set('active', `${this.active}`);
      }
      if (this.text) {
        queryMap.set('text', `${this.text}`);
      }
      if (this.lat) {
        queryMap.set('lat', `${this.lat}`);
      }
      if (this.lng) {
        queryMap.set('lng', `${this.lng}`);
      }
      if (this.distance) {
        queryMap.set('distance', `${this.distance}`);
      }
      if (this.price_max) {
        queryMap.set('price_max', `${this.price_max}`);
      }
      if (this.price_min) {
        queryMap.set('price_min', `${this.price_min}`);
      }
      if (this.vicinity) {
        queryMap.set('vicinity', `${this.vicinity}`);
      }
      if (this.task_status) {
        queryMap.set('task_status', `${this.task_status}`);
      }
      if (this.location_type) {
        queryMap.set('location_type', `${this.location_type}`);
      }
      return queryMap;
    }

    toQueryString() {
      let queryString = '';
      this.toQueryMap().forEach((value: string, key: string) => {
        queryString = queryString.concat(`${key}=${value}&`);
      });

   return queryString.substring(0, queryString.length - 1);
    }
  }
