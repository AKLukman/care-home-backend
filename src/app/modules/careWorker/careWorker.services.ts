import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TCareWoker } from "./careWoker.interface";
import { CareWoker } from "./careWoker.model";
import { careWokerSearchableFields } from "./careWorker.constant";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status'

const getAllCareWorkers = async ( query: Record<string, unknown> ) => {
    const careWorkerQuery = new QueryBuilder( CareWoker.find().populate( "user" ), query )
        .search( careWokerSearchableFields )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await careWorkerQuery.modelQuery;
    const meta = await careWorkerQuery.countTotal();
    return {
        result,
        meta,
    };
}
const getSingleCareWorkerFromDB = async ( id: string ) => {
    const result = await CareWoker.findById( { _id: id } );
    return result;
};

const updateCareWorkerFromDB = async ( id: string, payload: Partial<TCareWoker> ) => {
    const { name, ...remainingCareWorkerData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingCareWorkerData,
    };

    if ( name && Object.keys( name ).length ) {
        for ( const [ key, value ] of Object.entries( name ) ) {
            modifiedUpdatedData[ `name.${ key }` ] = value;
        }
    }

    const result = await CareWoker.findByIdAndUpdate( { _id: id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    } );
    return result;
};

const deleteCareWokerFromDB = async ( id: string ) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedCareWoker = await CareWoker.findByIdAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session },
        );

        if ( !deletedCareWoker ) {
            throw new AppError( httpStatus.BAD_REQUEST, 'Failed to delete care worker' );
        }

        // get user _id from deleted Care worker
        const userId = deletedCareWoker.user;

        const deletedUser = await User.findOneAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if ( !deletedUser ) {
            throw new AppError( httpStatus.BAD_REQUEST, 'Failed to delete user' );
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedCareWoker;
    } catch ( err: any ) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error( err );
    }
};

export const CareWorkerServices = {
    getAllCareWorkers,
    getSingleCareWorkerFromDB,
    updateCareWorkerFromDB,
    deleteCareWokerFromDB
}