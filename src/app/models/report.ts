import { Resource } from './Resource';
export class Report extends Resource {
    TaskId: string | undefined;
    TaskCreatedAt: string | undefined;
    CreatorId: string | undefined;
    CreatorName: string | undefined;
    CreatorPicture: string | undefined;
    TaskSummary: string | undefined;
    Reason: string | undefined;
    CreatedAt: string | undefined;
    Active: boolean | undefined;
    TempCreatedAt?: string | undefined;
}
