import { Query, Schema, model } from 'mongoose';
import { CareWokerModel, TCareWoker, TCareWokerName } from './careWoker.interface';
import { BloodGroup, Gender } from './careWorker.constant';




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
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: [ true, 'Email is required' ],
            unique: true,
        },
        contactNo: { type: String, required: [ true, 'Contact number is required' ] },
        emergencyContactNo: {
            type: String,
            required: [ true, 'Emergency contact number is required' ],
        },
        bloodGroup: {
            type: String,
            enum: {
                values: BloodGroup,
                message: '{VALUE} is not a valid blood group',
            },
        },

        address: {
            type: String,
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