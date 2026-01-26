import cron from 'node-cron';
import { MedicationCronService } from '../medicationRecord/mediicationRecord.corn.service';


// Runs every day at 5:00 AM
export const medicationCronJob = () => {
    cron.schedule( '1 0 * * *', async () => {
        console.log( '⏰ Running medication cron...' );
        await MedicationCronService.generateDailyMedicationRecords();
    } );
};
