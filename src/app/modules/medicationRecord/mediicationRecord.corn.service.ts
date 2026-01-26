import { getStartOfToday } from '../../utils/getStartOfToday';
import { MedicationSchedule } from '../medicationSchedule/medicationSchedule.model';
import { MedicationRecord } from './medicationRecord.model';


const generateDailyMedicationRecords = async () => {
    const today = getStartOfToday();

    //Find active schedules
    const schedules = await MedicationSchedule.find( {
        startDate: { $lte: today },
        $or: [ { endDate: null }, { endDate: { $gte: today } } ],
        isDeleted: false,
    } );

    for ( const schedule of schedules ) {
        for ( const dose of schedule.doses ) {
            const exists = await MedicationRecord.findOne( {
                patient: schedule.patient,
                medication: schedule.medication,
                date: today,
                time: dose.time,
            } );

            //Skip if already exists
            if ( exists ) continue;

            //Create MAR
            await MedicationRecord.create( {
                patient: schedule.patient,
                medication: schedule.medication,
                schedule: schedule._id,
                date: today,
                time: dose.time,
                dose: dose.dose,
                status: 'PENDING',
            } );
        }
    }

    console.log( 'Daily medication records generated' );
};

export const MedicationCronService = {
    generateDailyMedicationRecords,
};
