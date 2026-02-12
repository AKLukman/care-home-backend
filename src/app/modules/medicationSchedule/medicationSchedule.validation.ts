import { z } from 'zod';
import { MedicationTime } from './medicationSchedule.constant';

export const createMedicationScheduleSchema = z.object( {
    body: z.object( {
        patient: z.string(),
        medication: z.string(),
        doses: z.array(
            z.object( {
                time: z.enum( MedicationTime ),
                dose: z.string().min( 0 ),
            } )
        ),

        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
    } ),
} );
export const updateMedicationScheduleSchema = z.object( {
    body: z.object( {
        patient: z.string().optional(),
        medication: z.string().optional(),

        doses: z.array(
            z.object( {
                time: z.enum( MedicationTime ),
                dose: z.string().min( 0 ),
            } )
        ).optional(),

        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
    } ),
} );
