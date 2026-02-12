import { Schema } from "mongoose";
import { PatientModel, TAddress, TPatient, TPatientName } from "./patient.interface";
import { BloodGroup, Gender } from "./patient.constant";
import { Admin } from "../admin/admin.model";
import { model } from "mongoose";

const patientNameSchema = new Schema<TPatientName>( {
    firstName: {
        type: String,
        required: [ true, 'First Name is required' ],
        trim: true,
        maxlength: [ 20, 'Name can not be more than 20 characters' ],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [ true, 'Last Name is required' ],
        maxlength: [ 20, 'Name can not be more than 20 characters' ],
    },
} );

const patientAddressSchema = new Schema<TAddress>( {
    address1: {
        type: String,
        required: [ true, "Street address is required" ],
        trim: true,
        maxlength: [ 80, 'Street address can not be more than 80 characters' ],

    },

    town: {
        type: String,
        required: [ true, "Town name is required" ],
        trim: true,
        maxlength: [ 80, 'Town name can not be more than 80 characters' ],
    },
    county: {
        type: String,
        required: [ true, "County name is required" ],
        trim: true,
        maxlength: [ 80, 'County name can not be more than 80 characters' ],
    },
    country: {
        type: String,
    },
    postcode: {
        type: String,
        required: [ true, "Postcode is required" ],
        trim: true,
        maxlength: [ 10, 'Postcode can not be more than 80 characters' ],
    }
} )

const PatientSchema = new Schema<TPatient, PatientModel>(
    {

        createdBy: {
            type: Schema.Types.ObjectId,
            required: [ true, 'Admin id is required' ],
            ref: 'Admin',
        },

        name: {
            type: patientNameSchema,
            required: [ true, 'Name is required' ],
        },
        gender: {
            type: String,
            enum: {
                values: Gender,
                message: '{VALUE} is not a valid gender',
            },
            required: [ true, 'Gender is required' ],
        },
        allergies: {
            type: [ String ],
            default: []
        },
        dateOfBirth: { type: Date, required: [ true, "Date of birth is required" ] },
        contactNo: { type: String, required: [ true, 'Contact number is required' ] },
        emergencyContactNo: {
            type: String,
        },
        bloodGroup: {
            type: String,
            enum: {
                values: BloodGroup,
                message: '{VALUE} is not a valid blood group',
            },
        },

        address: {
            type: patientAddressSchema,
        },
        profileImg: { type: String, default: '' },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    },
);

PatientSchema.statics.isUserExists = async function ( id: string ) {
    const existingUser = await Admin.findOne( { _id: id } );
    return existingUser;
};

export const Patient = model<TPatient, PatientModel>( 'Patient', PatientSchema );