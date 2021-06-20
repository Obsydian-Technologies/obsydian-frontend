import { Resource } from './Resource';
export class Musthave extends Resource {
    TaskId: string | undefined;
    Summary: string | undefined;
    Active: boolean | undefined;
    CreatedAt: string | undefined;
    TempCreatedAt?: string | undefined;
}
