import { Resource } from './Resource';
export class Reply extends Resource {
    TaskId: string | undefined;
    TaskCreatedAt: string | undefined;
    OfferId: string | undefined;
    QuestionId: string | undefined;
    CreatorId: string | undefined;
    CreatorName: string | undefined;
    CreatorPicture: string | undefined;
    ReplyToId: string | undefined;
    ReplyToName: string | undefined;
    ReplyToPicture: string | undefined;
    Summary: string | undefined;
    Active: boolean | undefined;
    CreatedAt: string | undefined;
    TempCreatedAt?: string | undefined;
}
