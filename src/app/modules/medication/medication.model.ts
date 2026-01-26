import { Schema, model } from 'mongoose';
import { TMedication, MedicationModel } from './medication.interface';
import { MedicationForm, TMedicationForm } from './medication.constant';

const medicationSchema = new Schema<TMedication, MedicationModel>(
    {
        name: {
            type: String,
            required: [ true, 'Medication name is required' ],
            trim: true,
        },
        strength: {
            type: String,
            required: [ true, 'Strength is required' ],
            trim: true,
        },
        form: {
            type: String,
            enum: MedicationForm,
            required: [ true, 'Medication form is required' ],
        },
        description: {
            type: String,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


medicationSchema.statics.isMedicationExists = async function ( name: string, strength: string, form: TMedicationForm ) {
    return this.findOne( { name, strength, form } );
};

export const Medication = model<TMedication, MedicationModel>(
    'Medication',
    medicationSchema
);
