export const MedicationStatus = [ 'PENDING', 'TAKEN', 'MISSED' ] as const;

export type TMedicationStatus = typeof MedicationStatus[ number ];

export const medicationRecorSearchableFields = [ "createdAt", "date", "patient" ] as string[]

export const medicationRecorFilterableFields = [ "date", "patient" ] as string[]
