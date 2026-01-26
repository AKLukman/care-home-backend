import { Schema, model } from 'mongoose';
import { TMedicationRecord } from './medicationRecord.interface';
import { MedicationStatus } from './medicationRecord.constant';

const medicationRecordSchema = new Schema<TMedicationRecord>(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
        },
        medication: {
            type: Schema.Types.ObjectId,
            ref: 'Medication',
            required: true,
        },
        schedule: {
            type: Schema.Types.ObjectId,
            ref: 'MedicationSchedule',
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },

        dose: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: MedicationStatus,
            default: 'PENDING',
        },

        administeredBy: {
            type: Schema.Types.ObjectId,
            ref: 'CareWorker',
        },
        administeredAt: {
            type: Date,
        },

        note: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

//Prevent duplicate MAR for same dose
medicationRecordSchema.index(
    { patient: 1, medication: 1, date: 1, time: 1 },
    { unique: true }
);

export const MedicationRecord = model<TMedicationRecord>(
    'MedicationRecord',
    medicationRecordSchema
);
