import { Resource } from './Resource';
export class Skill extends Resource {
    UserId: string | undefined;
    Summary: string | undefined;
    Active: boolean | undefined;
    CreatedAt: string | undefined;
    TempCreatedAt?: string | undefined;
}
