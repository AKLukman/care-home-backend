// medicationSchedule.model.ts
import { Schema, model } from 'mongoose';
import { MedicationScheduleModel, TMedicationSchedule } from './medicationSchedule.interface';
import { MedicationTime } from './medicationSchedule.constant';

const doseSchema = new Schema(
    {
        time: {
            type: String,
            enum: MedicationTime,
            required: true,
        },
        dose: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const medicationScheduleSchema = new Schema<TMedicationSchedule>(
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

        doses: {
            type: [ doseSchema ],
            required: true,
        },

        startDate: {
            type: Date,
        },

        endDate: {
            type: Date,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            required: [ true, 'Admin id is required' ],
            ref: 'Admin',
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const MedicationSchedule = model<TMedicationSchedule, MedicationScheduleModel>( 'MedicationSchedule', medicationScheduleSchema )
