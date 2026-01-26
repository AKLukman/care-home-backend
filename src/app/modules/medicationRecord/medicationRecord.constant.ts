export const MedicationStatus = [ 'PENDING', 'TAKEN', 'MISSED' ] as const;

export type TMedicationStatus = typeof MedicationStatus[ number ];
