import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MedicationRecordService } from './medicationService.service';


const getTodayMedicationRecords = catchAsync( async ( req, res ) => {
    const careWorkerEmaail = req.user.email;
    const today = new Date();
    today.setHours( 0, 0, 0, 0 );

    const result =
        await MedicationRecordService.getTodayRecordsForCareWorker(
            today
        );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Today medication records retrieved',
        data: result,
    } );
} );

const updateMedicationStatus = catchAsync( async ( req, res ) => {
    const { id } = req.params;
    const careWorkerEmaail = req.user.email;

    const result =
        await MedicationRecordService.updateMedicationStatus( id as string, {
            ...req.body,
            careWorkerEmaail,
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
