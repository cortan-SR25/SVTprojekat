import { User } from "./user";

export class Group{
    id: string;
    name: string;
    description: string;
    creationDate: string;
    isSuspended: boolean;
    suspendedReason: string;
    groupAdmin: User;
}