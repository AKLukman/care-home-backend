import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { MedicationScheduleService } from './medicationSchedule.service';
import sendResponse from '../../utils/sendResponse';


const createMedicationSchedule = catchAsync( async ( req, res ) => {
    const adminEmail = req?.user?.email
    const result =
        await MedicationScheduleService.createMedicationSchedule( req.body, adminEmail );

    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Medication schedule created successfully',
        data: result,
    } );
} );

const getMedicationSchedules = catchAsync( async ( req, res ) => {
    const result =
        await MedicationScheduleService.getMedicationSchedules( req.query );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication schedules retrieved successfully',
        data: result,
    } );
} );

const getSingleMedicationSchedule = catchAsync( async ( req, res ) => {
    const { id } = req.params;

    const result =
        await MedicationScheduleService.getSingleMedicationSchedule( id as string );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication schedule retrieved successfully',
        data: result,
    } );
} );

const updateMedicationSchedule = catchAsync( async ( req, res ) => {
    const { id } = req.params;

    const result =
        await MedicationScheduleService.updateMedicationSchedule( id as string, req.body );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication schedule updated successfully',
        data: result,
    } );
} );

const deleteMedicationSchedule = catchAsync( async ( req, res ) => {
    const { id } = req.params;

    const result = await MedicationScheduleService.deleteMedicationSchedule( id as string );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication schedule deleted successfully',
        data: result
    } );
} );

export const MedicationScheduleController = {
    createMedicationSchedule,
    getMedicationSchedules,
    getSingleMedicationSchedule,
    updateMedicationSchedule,
    deleteMedicationSchedule,
};
