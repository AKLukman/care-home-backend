import { MedicationRecord } from './medicationRecord.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createMedicationRecord = async ( payload: any ) => {
    return await MedicationRecord.create( payload );
};

const getTodayRecordsForCareWorker = async (
    date: Date
) => {
    return await MedicationRecord.find( {
        date,
    } )
        .populate( 'patient' )
        .populate( 'medication' )
        .populate( 'schedule' );
};

const updateMedicationStatus = async (
    id: string,
    payload: {
        status: string;
        note?: any;
        careWorkerEmail: string;
    }
) => {
    const record = await MedicationRecord.findById( id );

    if ( !record ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Medication record not found' );
    }

    record.status = payload.status as any;
    record.note = payload.note;
    record.administeredBy = payload.careWorkerEmail as any;
    record.administeredAt = new Date();

    await record.save();
    return record;
};

export const MedicationRecordService = {
    createMedicationRecord,
    getTodayRecordsForCareWorker,
    updateMedicationStatus,
};
