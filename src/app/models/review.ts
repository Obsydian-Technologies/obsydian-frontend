import { Resource } from './Resource';
export class Review extends Resource {
    UserId: string | undefined;
    ReviewedUserId: string | undefined;
    ReviewedUserName: string | undefined;
    Summary: string | undefined;
    TaskId: string | undefined;
    TaskSummary: string | undefined;
    Active: boolean | undefined;
    CreatedAt: string | undefined;
    Rating:number | undefined;
    TempCreatedAt?: string | undefined;
}
