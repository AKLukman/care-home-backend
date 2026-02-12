import { Query, Schema, model } from 'mongoose';
import { CareWokerModel, TAddress, TCareWoker, TCareWokerName } from './careWoker.interface';
import { BloodGroup, CareWorkerDesignation, Gender } from './careWorker.constant';




const userNameSchema = new Schema<TCareWokerName>( {
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

const careWorkerAddressSchema = new Schema<TAddress>( {
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
    postcode: {
        type: String,
        required: [ true, "Postcode is required" ],
        trim: true,
        maxlength: [ 10, 'Postcode can not be more than 80 characters' ],
    }
} )

const careWokerSchema = new Schema<TCareWoker, CareWokerModel>(
    {

        user: {
            type: Schema.Types.ObjectId,
            required: [ true, 'User id is required' ],
            unique: true,
            ref: 'User',
        },

        name: {
            type: userNameSchema,
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
        designation: {
            type: String,
            enum: {
                values: CareWorkerDesignation,
                message: '{VALUE} is not a valid gender',
            },
            required: [ true, 'Gender is required' ],
        },
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: [ true, 'Email is required' ],
            unique: true,
        },
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
            type: careWorkerAddressSchema,
        },
        profileImg: { type: String, default: '' },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

// generating full name
careWokerSchema.virtual( 'fullName' ).get( function () {
    return (
        this?.name?.firstName +
        '' +
        this?.name?.middleName +
        '' +
        this?.name?.lastName
    );
} );

// filter out deleted documents

//checking if user is already exist!
careWokerSchema.statics.isUserExists = async function ( email: string ) {
    const existingUser = await CareWoker.findOne( { email } );
    return existingUser;
};

export const CareWoker = model<TCareWoker, CareWokerModel>( 'CareWorker', careWokerSchema );