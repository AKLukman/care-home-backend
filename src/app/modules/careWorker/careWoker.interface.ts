import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';
export type TCareWorkerDesignation =
    'CARE_ASSISTANT' |
    'SENIOR_CARE_ASSISTANT' |
    'SUPPORT_WORKER' |
    'NURSE' |
    'TEAM_LEADER' |
    'DEPUTY_MANAGER';





export type TCareWokerName = {
    firstName: string;
    middleName: string;
    lastName: string;
};
export type TAddress = {
    address1: string
    town: string
    county: string
    postcode: string
    country: "UK"
}
export type TCareWoker = {
    user: Types.ObjectId;
    name: TCareWokerName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    designation: TCareWorkerDesignation;
    contactNo: string;
    emergencyContactNo?: string;
    bloodGroup?: TBloodGroup;
    address: TAddress;
    profileImg?: string;
    isDeleted: boolean;
};

export interface CareWokerModel extends Model<TCareWoker> {
    isUserExists( email: string ): Promise<TCareWoker | null>;
}