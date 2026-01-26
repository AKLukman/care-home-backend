import { z } from 'zod';
import { MedicationStatus } from './medicationRecord.constant';
import { MedicationTime } from '../medicationSchedule/medicationSchedule.constant';

export const updateMedicationRecordSchema = z.object( {
    body: z.object( {
        status: z.enum( MedicationStatus ),
        note: z.string().optional(),
    } ),
} );

export const createMedicationRecordSchema = z.object( {
    body: z.object( {
        patient: z.string(),
        medication: z.string(),
        schedule: z.string(),
        date: z.string().datetime(),
        time: z.enum( MedicationTime ),
        dose: z.number().min( 0 ),
    } ),
} );
