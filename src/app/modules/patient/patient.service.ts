
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { Admin } from "../admin/admin.model"
import { TPatient } from "./patient.interface"
import httpStatus from 'http-status'
import { Patient } from "./patient.model";
import { Error } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { PatientSearchableFields } from "./patient.constant";

const insertIntoDB = async ( file: any, payload: TPatient, adminEmail: string ) => {


    try {
        const isAdminExists = await Admin.findOne( { email: adminEmail } )
        if ( !isAdminExists ) {
            throw new AppError( httpStatus.NOT_FOUND, 'Admin not found or deleted.' );
        }

        payload.createdBy = isAdminExists?._id;
        if ( file ) {
            const imageName = `${ Date() }${ payload?.name?.firstName }`;
            const path = file?.path;
            //send image to cloudinary
            const { secure_url } = await sendImageToCloudinary( imageName, path );
            payload.profileImg = secure_url as string;
        }
        const createPatient = await Patient.create( payload );
        return createPatient

    } catch ( error: any ) {
        throw new Error( error );
    }

}

const getPatientsFromDB = async ( query: Record<string, unknown> ) => {

    const patientQuery = new QueryBuilder( Patient.find().populate( 'createdBy' ), query )
        .search( PatientSearchableFields )
        .filter()
        .sort()
        .paginate()
        .fields();


    const result = await patientQuery.modelQuery;
    const meta = await patientQuery.countTotal();
    return {
        result,
        meta,
    };

}

const getSinglePatient = async ( id: string ) => {
    const result = await Patient.findById( { _id: id } ).populate( 'createdBy' )
    return result
}
const deletePatient = async ( id: string ) => {


    const result = await Patient.findByIdAndUpdate(
        { _id: id },
        { isDeleted: true },
        { new: true },
    );
    return result
}

const updatePatientIntoDB = async ( id: string, payload: Partial<TPatient> ) => {
    const { address, name, ...remainingAdminData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingAdminData,
    };

    if ( name && Object.keys( name ).length ) {
        for ( const [ key, value ] of Object.entries( name ) ) {
            modifiedUpdatedData[ `name.${ key }` ] = value;
        }
    }
    if ( address && Object.keys( address ).length ) {
        for ( const [ key, value ] of Object.entries( address ) ) {
            modifiedUpdatedData[ `address.${ key }` ] = value;
        }
    }

    const result = await Patient.findByIdAndUpdate( { _id: id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    } );
    return result;
};

export const PatientServices = {
    insertIntoDB,
    getPatientsFromDB,
    getSinglePatient,
    deletePatient,
    updatePatientIntoDB
}