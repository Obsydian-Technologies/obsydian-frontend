import { Resource } from './Resource';
export class Question extends Resource {
    TaskId: string | undefined;
    TaskCreatedAt: string | undefined;
    CreatorId: string | undefined;
    CreatorName: string | undefined;
    CreatorPicture: string | undefined;
    Summary: string | undefined;
    Active: boolean | undefined;
    CreatedAt: string | undefined;
    TempCreatedAt?: string;
}
