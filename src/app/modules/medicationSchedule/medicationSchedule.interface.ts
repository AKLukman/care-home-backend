// medicationSchedule.interface.ts
import { Model, Types } from 'mongoose';
import { TMedicationTime } from './medicationSchedule.constant';

export type TDosePerTime = {
    time: TMedicationTime;
    dose: string;
};

export type TMedicationSchedule = {
    patient: Types.ObjectId;
    medication: Types.ObjectId;

    doses: TDosePerTime[];

    startDate?: Date;
    endDate?: Date;

    createdBy: Types.ObjectId;

    isActive: boolean;
    isDeleted: boolean;
};

export interface MedicationScheduleModel extends Model<TMedicationSchedule> { }
