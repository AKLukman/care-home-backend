import { Model } from "mongoose";
import { TMedicationForm } from "./medication.constant";


export type TMedication = {
    name: string;
    strength: string;
    form: TMedicationForm;
    description?: string;
    isDeleted: boolean;
};

export interface MedicationModel extends Model<TMedication> {
    isMedicationExists( name: string, strength: string, form: TMedicationForm ): Promise<TMedication | null>;
}
