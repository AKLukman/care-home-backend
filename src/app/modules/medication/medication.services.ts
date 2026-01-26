import httpStatus from 'http-status';

import { Medication } from './medication.model';
import AppError from '../../errors/AppError';
import { TMedication } from './medication.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { medicationSearchableFields } from './medication.constant';


const createMedicationIntoDB = async ( payload: TMedication ) => {
    const isExist = await Medication.isMedicationExists( payload.name, payload.strength, payload.form )
    if ( isExist ) {
        throw new AppError( httpStatus.CONFLICT, 'This medicine already exists with same name, strength, form and description' );
    }
    const result = await Medication.create( payload );
    return result;
};

const getAllMedicationsFromDB = async ( query: Record<string, unknown> ) => {
    const medicationQuery = new QueryBuilder( Medication.find(), query )
        .search( medicationSearchableFields )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await medicationQuery.modelQuery;
    const meta = await medicationQuery.countTotal();
    return {
        result,
        meta,
    };
};

const updateMedicationIntoDB = async (
    id: string,
    payload: Partial<TMedication>
) => {
    const result = await Medication.findByIdAndUpdate( id, payload, {
        new: true,
    } );

    if ( !result ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Medication not found' );
    }

    return result;
};

const deleteMedicationFromDB = async ( id: string ) => {
    const result = await Medication.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    if ( !result ) {
        throw new AppError( httpStatus.NOT_FOUND, 'Medication not found' );
    }

    return result;
};

export const MedicationServices = {
    createMedicationIntoDB,
    getAllMedicationsFromDB,
    updateMedicationIntoDB,
    deleteMedicationFromDB,
};
