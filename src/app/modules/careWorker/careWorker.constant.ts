import { TBloodGroup, TCareWorkerDesignation, TGender } from "./careWoker.interface";


export const Gender: TGender[] = [ 'male', 'female', 'other' ];

export const BloodGroup: TBloodGroup[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];

export const CareWorkerDesignation: TCareWorkerDesignation[] = [
    'CARE_ASSISTANT',
    'SENIOR_CARE_ASSISTANT',
    'SUPPORT_WORKER',
    'NURSE',
    'TEAM_LEADER',
    'DEPUTY_MANAGER',
];


export const careWokerSearchableFields = [
    'email',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];