import { MedicationSchedule } from './medicationSchedule.model';
import { TMedicationSchedule } from './medicationSchedule.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Patient } from '../patient/patient.model';
import { Medication } from '../medication/medication.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from '../admin/admin.model';

const createMedicationSchedule = async (
    payload: TMedicationSchedule, adminEmail: string
) => {
    const isExistPatient = await Patient.findById( payload.patient )
    if ( !isExistPatient ) {
        throw new AppError( httpStatus.NOT_FOUND, "This patient doesn't exist." )
    }
    const isExistMedication = await Medication.findById( payload.medication )
    if ( !isExistMedication ) {
        throw new AppError( httpStatus.NOT_FOUND, "This medicine doesn't exist." )
    }
    const isAdminExists = await Admin.findOne( { email: adminEmail } )
    if ( !isAdminExists ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Admin not found or deleted.' );
    }

    payload.createdBy = isAdminExists?._id;
    return await MedicationSchedule.create( payload );
};

const getMedicationSchedules = async ( query: Record<string, unknown> ) => {
    const medicationScheduleQuery = new QueryBuilder( MedicationSchedule.find().populate( 'patient' ).populate( 'medication' ), query )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await medicationScheduleQuery.modelQuery;
    const meta = await medicationScheduleQuery.countTotal();
    return {
        result,
        meta,
    };

};

const getMedicationScheduleByPatient = async ( id: string ) => {
    const schedule = await MedicationSchedule.find( { patient: id } )
        .populate( 'patient' )
        .populate( 'medication' )
        .populate( 'createdBy' )


    if ( !schedule ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Medication schedule not found' );
    }

    return schedule;
};

const updateMedicationSchedule = async (
    id: string,
    payload: Partial<TMedicationSchedule>
) => {
    const schedule = await MedicationSchedule.findById( id );

    if ( !schedule ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Medication schedule not found' );
    }

    return await MedicationSchedule.findByIdAndUpdate( id, payload, {
        new: true,
        runValidators: true,
    } );
};

const deleteMedicationSchedule = async ( id: string ) => {
    const schedule = await MedicationSchedule.findById( id );

    if ( !schedule ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Medication schedule not found' );
    }

    return await MedicationSchedule.findByIdAndDelete( id );
};

export const MedicationScheduleService = {
    createMedicationSchedule,
    getMedicationSchedules,
    getMedicationScheduleByPatient,
    updateMedicationSchedule,
    deleteMedicationSchedule,
};
