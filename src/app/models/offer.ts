import { Resource } from './Resource';
export class Offer extends Resource {
    TaskId: string | undefined;
    TaskCreatedAt: string | undefined;
    CreatorId: string | undefined;
    CreatorName: string | undefined;
    CreatorPicture: string | undefined;
    Amount: number | undefined;
    Currency: string | undefined;
    ServiceFee: number | undefined;
    Receivable: number | undefined;
    Summary: string | undefined;
    Active: boolean | undefined;
    Accepted: boolean | undefined;
    CreatedAt: string | undefined;
    TempCreatedAt?: string | undefined;
}
