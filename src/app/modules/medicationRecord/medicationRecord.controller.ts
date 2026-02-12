import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicationRecordService } from './medicationRecordService.service';




const getTodayMedicationRecords = catchAsync( async ( req, res ) => {
    // const { patientId } = req.params;

    const result =
        await MedicationRecordService.getTodayRecordsForCareWorker(
            // patientId as string,
            req.query
        );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Today medication records retrieved',
        data: result.result,
        meta: result.meta
    } );
} );

const updateMedicationStatus = catchAsync( async ( req, res ) => {
    const { id } = req.params;


    const updatedBy = req.user.email;

    const result =
        await MedicationRecordService.updateMedicationStatus( id as string, {
            ...req.body,
            updatedBy,
        } );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medication status updated',
        data: result,
    } );
} );

export const MedicationRecordController = {
    getTodayMedicationRecords,
    updateMedicationStatus,
};
