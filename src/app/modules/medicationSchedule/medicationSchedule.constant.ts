export const MedicationTime = [ 'BREAKFAST', 'LUNCH', 'TEA', 'DINNER' ] as const;

export type TMedicationTime = typeof MedicationTime[ number ];

