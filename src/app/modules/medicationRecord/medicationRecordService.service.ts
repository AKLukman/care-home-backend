import { MedicationRecord } from './medicationRecord.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { medicationRecorFilterableFields, medicationRecorSearchableFields } from './medicationRecord.constant';
import { Admin } from '../admin/admin.model';
import { CareWoker } from '../careWorker/careWoker.model';


const createMedicationRecord = async ( payload: any ) => {
    return await MedicationRecord.create( payload );
};

const getTodayRecordsForCareWorker = async (
    // patientId: string,
    query: Record<string, unknown>
) => {

    const medicationRecordQuery = new QueryBuilder( MedicationRecord.find()
        .populate( 'patient' )
        .populate( 'administeredBy' )
        .populate( 'medication' )
        .populate( 'schedule' ), query )
        .search( medicationRecorSearchableFields )
        .filter( medicationRecorFilterableFields )
        .sort()
        .paginate()
        .fields();

    const result = await medicationRecordQuery.modelQuery;
    const meta = await medicationRecordQuery.countTotal();
    // console.log( { result } )
    return {
        result,
        meta,
    };
};

const updateMedicationStatus = async (
    id: string,
    payload: {
        status: string;
        note?: any;
        updatedBy: string;
    }
) => {

    try {
        const admin = await Admin.findOne( { email: payload.updatedBy } )
        const careWorker = await CareWoker.findOne( { email: payload.updatedBy } )
        const user = admin ?? careWorker;
        if ( !user ) {
            throw new AppError( httpStatus.NOT_FOUND, 'User not found or deleted.' );
        }

        const record = await MedicationRecord.findById( id );

        if ( !record ) {
            throw new AppError( httpStatus.NOT_FOUND, 'Medication record not found' );
        }

        record.status = payload.status as any;
        record.note = payload.note;
        record.administeredBy = user?._id;
        record.administeredByModel = admin ? "Admin" : "CareWorker";
        record.administeredAt = new Date();

        await record.save();
        return record;

    } catch ( error ) {

    }

};

export const MedicationRecordService = {
    createMedicationRecord,
    getTodayRecordsForCareWorker,
    updateMedicationStatus,
};
