import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MedicationServices } from './medication.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';


const createMedication = catchAsync( async ( req: Request, res: Response ) => {
    const result = await MedicationServices.createMedicationIntoDB( req.body );

    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Medication created successfully',
        data: result,
    } );
} );

const getAllMedications = catchAsync( async ( req, res ) => {
    const result = await MedicationServices.getAllMedicationsFromDB( req.query );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medications are retrieved successfully',
        meta: result.meta,
        data: result.result,
    } );
} );

const updateMedication = catchAsync( async ( req, res ) => {
    const { id } = req.params;
    const result = await MedicationServices.updateMedicationIntoDB( id as string, req.body );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication updated successfully',
        data: result,
    } );
} );

const deleteMedication = catchAsync( async ( req, res ) => {
    const { id } = req.params;
    const result = await MedicationServices.deleteMedicationFromDB( id as string );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication deleted successfully',
        data: result,
    } );
} );

export const MedicationControllers = {
    createMedication,
    getAllMedications,
    updateMedication,
    deleteMedication,
};
