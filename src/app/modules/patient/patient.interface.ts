import { Model, Types } from "mongoose";
import { TAdmin } from "../admin/admin.interface";

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

export type TPatientName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TAddress = {
    line1: string
    line2?: string
    city: string
    county: string
    postcode: string
    country: "UK"
}

export type TPatient = {
    createdBy: Types.ObjectId;
    name: TPatientName;
    gender: TGender;
    bloodGroup?: TBloodGroup;
    dateOfBirth: Date;
    allergies: string[],
    address: TAddress;
    contactNo: string;
    emergencyContactNo?: string;
    profileImg?: string;
    isDeleted: boolean;
}

export interface PatientModel extends Model<TPatient> {
    isAdminExists( id: string ): Promise<TAdmin | null>;
}