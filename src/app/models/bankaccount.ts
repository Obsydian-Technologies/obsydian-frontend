import { Resource } from './Resource';
export class BankAccount extends Resource {
    Id: string | undefined;
    UserId: string | undefined;
    BankName: string | undefined;
    AccountNumber: string | undefined;
    BranchCode: string | undefined;
    CustomerReference: string | undefined;
}
