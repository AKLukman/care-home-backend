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

export type TCareWokerName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TCareWoker = {
    user: Types.ObjectId;
    name: TCareWokerName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo?: string;
    bloogGroup?: TBloodGroup;
    address?: string;
    profileImg?: string;
    isDeleted: boolean;
};

export interface CareWokerModel extends Model<TCareWoker> {
    isUserExists( email: string ): Promise<TCareWoker | null>;
}