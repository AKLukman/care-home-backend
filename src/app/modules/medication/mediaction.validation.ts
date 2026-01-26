import { z } from 'zod';
import { MedicationForm } from './medication.constant';


export const createMedicationValidationSchema = z.object( {
    body: z.object( {
        name: z.string().min( 1, 'Medication name is required' ),
        strength: z.string().min( 1, 'Strength is required' ),
        form: z.enum( MedicationForm ),
        description: z.string().optional(),
    } ),
} );

export const updateMedicationValidationSchema = z.object( {
    body: z.object( {
        name: z.string().optional(),
        strength: z.string().optional(),
        form: z.enum( MedicationForm ).optional(),
        description: z.string().optional(),
    } ),
} );
