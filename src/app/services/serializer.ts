import { Resource } from '../models/Resource';

export interface Serializer {
    fromJson(json: any): Resource;
    toJson(resource: Resource): any;
  }
