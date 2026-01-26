export const MedicationForm = [ 'TABLET', 'SYRUP', 'CAPSULE', 'INJECTION' ] as const;

export type TMedicationForm = typeof MedicationForm[ number ];

export const medicationSearchableFields = [
    'name',

];