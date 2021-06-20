import { Resource } from './Resource';
import { Offer } from './offer';
import { Question } from './question';
import { Review } from './review';
export class Task extends Resource {
    Id: string | undefined;
    Offers: Array<Offer> | undefined;
    Questions: Array<Question> | undefined;
    Reviews: Array<Review> | undefined;
    CreatorId: string | undefined;
    CreatorName: string | undefined;
    CreatorPicture: string | undefined;
    Summary: string | undefined;
    Description: string | undefined;
    Price: number | undefined;
    Currency: number | undefined;
    TaskLocation: string | undefined;
    TaskLocationVicinity: string | undefined;
    TaskLocationCountry: string | undefined;
    GeoLocation: Array<number> | undefined;
    DueDate: string | undefined;
    tempDueDate: string | undefined;
    TaskStatus: string | undefined;
    Category: string | undefined;
    NumberOfOffers: number | undefined;
    Remote: boolean | undefined;
    Active: boolean | undefined;
    AssignedUser: string | undefined;
    PrivateChatId: string | undefined;
    PaymentRequested: boolean | undefined;
    MustHaves: Array<string> | undefined;
    CreatedAt: string | any | undefined;
    assignedTasks: Array<Task> | undefined;
    completedTasks: Array<Task> | undefined;
    postedTasks: Array<Task> | undefined;
    pendingTasks: Array<Task> | undefined;
    draftTasks: Array<Task> | undefined;
    Photos: Array<string> | undefined;
    canAddReview: boolean | undefined;
    canAddReviewForName: string | undefined;
    canAddReviewForId: string | undefined;


}
