import { Resource } from './Resource';
export class Notification extends Resource {
    TaskId: string | undefined;
    Recipient: string | undefined;
    UserId: string | undefined;
    Summary: string | undefined;
    Active: boolean | undefined;
    NotificationStatus: string | undefined;
    NotificationType: string | undefined;
    CreatedAt: string | undefined;
    TempCreatedAt?: string | undefined;
}
