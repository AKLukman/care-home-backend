import AppError from "../../errors/AppError";
import httpStatus from 'http-status'
import { TAdmin } from "../admin/admin.interface";
import { TUser } from "./user.interface";
import mongoose from "mongoose";
import { User } from "./user.model";
import { Admin } from "../admin/admin.model";
import config from "../../config";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TCareWoker } from "../careWorker/careWoker.interface";
import { CareWoker } from "../careWorker/careWoker.model";

const createAdminIntoDB = async (
    file: any,
    password: string,
    payload: TAdmin,
) => {
    // create a user object
    const userData: Partial<TUser> = {};

    // user is exist or not
    const existingUser = await Admin.findOne( { email: payload.email } );

    if ( existingUser ) {
        throw new AppError( httpStatus.CONFLICT, "This email already exists" )
    }

    //if password is not given , use deafult password
    userData.password = password || ( config.admin_password as string );

    //set student role
    userData.role = 'admin';
    //set admin email
    userData.email = payload.email;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();


        if ( file ) {
            const imageName = `${ Date() }${ payload?.name?.firstName }`;
            const path = file?.path;
            //send image to cloudinary
            const { secure_url } = await sendImageToCloudinary( imageName, path );
            payload.profileImg = secure_url as string;
        }

        // create a user (transaction-1)
        const [ newUser ] = await User.create( [ userData ], { session } );

        //create a admin
        if ( !newUser ) {
            throw new AppError( httpStatus.BAD_REQUEST, 'Failed to create admin' );
        }

        //  _id as user
        payload.user = newUser._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = await Admin.create( [ payload ], { session } );

        if ( !newAdmin.length ) {
            throw new AppError( httpStatus.BAD_REQUEST, 'Failed to create admin' );
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch ( err: any ) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error( err );
    }
};
const createCareWorkerIntoDB = async (
    file: any,
    password: string,
    payload: TCareWoker,
) => {
    // create a user object
    const userData: Partial<TUser> = {};

    // user is exist or not
    const existingUser = await CareWoker.findOne( { email: payload.email } );

    if ( existingUser ) {
        throw new AppError( httpStatus.CONFLICT, "This email already exists" )
    }

    //if password is not given , use deafult password
    userData.password = password || ( config.careWorker_password as string );

    //set  role
    userData.role = 'careWorker';
    //set care worker email
    userData.email = payload.email;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();


        if ( file ) {
            const imageName = `${ Date() }${ payload?.name?.firstName }`;
            const path = file?.path;
            //send image to cloudinary
            const { secure_url } = await sendImageToCloudinary( imageName, path );
            payload.profileImg = secure_url as string;
        }

        // create a user (transaction-1)
        const [ newUser ] = await User.create( [ userData ], { session } );

        //create a admin
        if ( !newUser ) {
            throw new AppError( httpStatus.BAD_REQUEST, 'Failed to create care worker' );
        }

        //  _id as user
        payload.user = newUser._id; //reference _id
        // create a care worker (transaction-2)
        const newCareWorker = await CareWoker.create( [ payload ], { session } );

        if ( !newCareWorker.length ) {
            throw new AppError( httpStatus.BAD_REQUEST, 'Failed to create admin' );
        }

        await session.commitTransaction();
        await session.endSession();

        return newCareWorker;
    } catch ( err: any ) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error( err );
    }
};

const getMe = async ( email: string, role: string ) => {
    let result = null;
    if ( role === 'careWorker' ) {
        result = await CareWoker.findOne( { email } ).populate( 'user' );
    }
    if ( role === 'admin' ) {
        result = await Admin.findOne( { email: email } ).populate( 'user' );
    }

    if ( role === 'superAdmin' ) {
        result = await Admin.findOne( { email: email } ).populate( 'user' );
    }

    return result;
};

const changeStatus = async ( id: string, payload: { status: string } ) => {
    const result = await User.findByIdAndUpdate( { _id: id }, payload, {
        new: true,
    } );
    return result;
};

export const UserServices = {
    createAdminIntoDB,
    createCareWorkerIntoDB,
    getMe,
    changeStatus

};