import { Model, Types } from 'mongoose';
import { TMedicationTime } from '../medicationSchedule/medicationSchedule.constant';
import { TMedicationStatus } from './medicationRecord.constant';

export type TMedicationRecord = {
    patient: Types.ObjectId;
    medication: Types.ObjectId;
    schedule: Types.ObjectId;

    date: Date;
    time: TMedicationTime;

    dose: number;
    status: TMedicationStatus;

    administeredBy: Types.ObjectId;
    administeredByModel: "Admin" | "CareWorker";

    administeredAt?: Date;

    note?: string;
};

export interface MedicationRecordModel extends Model<TMedicationRecord> { }
