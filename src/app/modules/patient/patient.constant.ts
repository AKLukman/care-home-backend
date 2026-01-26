import { TBloodGroup, TGender } from "./patient.interface";


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

export const PatientSearchableFields = [
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'address.postcode',
    'address.city',
    'address.county',
    'address.line1',
    'name.middleName',
];

export const PatientFilterableField = [
    'address.city',
    'address.county',
]