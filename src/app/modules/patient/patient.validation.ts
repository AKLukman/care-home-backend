import { z } from 'zod';
import { BloodGroup, Gender } from './patient.constant';

const patientNameValidationSchema = z.object( {
    firstName: z
        .string( { error: 'First name is required' } )
        .trim()
        .max( 20 ),

    middleName: z
        .string()
        .trim()
        .optional(),

    lastName: z
        .string( { error: 'Last name is required' } )
        .trim()
        .max( 20 ),
} );
const patientAddressValidationSchema = z.object( {
    address1: z
        .string( { error: 'Street address is required' } )
        .trim()
        .max( 80 ),

    town: z
        .string( { error: 'Town is required' } )
        .trim()
        .optional(),

    county: z
        .string( { error: 'County is required' } )
        .trim()
        .max( 80 ),

    country: z
        .string()
        .trim()
        .max( 80 ).optional(),

    postcode: z
        .string( { error: 'Postcode is required' } )
        .trim()
        .max( 10 ),
} );

export const createPatientValidationSchema = z.object( {
    body: z.object( {
        patient: z.object( {
            // createdBy: z
            //     .string( { error: 'Admin id is required' } )
            //     .length( 24, 'Invalid admin id' ),

            name: patientNameValidationSchema,

            gender: z.enum( [ ...Gender ] as [ string, ...string[] ] ),

            dateOfBirth: z.string( { error: 'Date of birth is required' } ),

            allergies: z.array( z.string() ).optional(),

            contactNo: z
                .string( { error: 'Contact number is required' } ),

            emergencyContactNo: z.string().optional(),

            bloodGroup: z.enum( [ ...BloodGroup ] as [ string, ...string[] ] ).optional(),

            address: patientAddressValidationSchema,

        } )


    } ),
} );

const updatePatientNameValidationSchema = z.object( {
    firstName: z.string().min( 3 ).max( 20 ).optional(),
    middleName: z.string().min( 3 ).max( 20 ).optional(),
    lastName: z.string().min( 3 ).max( 20 ).optional(),
} );

const updatePatientAddressValidationSchema = z.object( {
    address1: z
        .string()
        .trim()
        .max( 80 ).optional(),

    town: z
        .string()
        .trim()
        .optional(),

    county: z
        .string()
        .trim()
        .max( 80 ).optional(),

    country: z
        .string()
        .trim()
        .max( 80 ).optional(),

    postcode: z
        .string()
        .trim()
        .max( 10 ).optional(),
} );

export const updatePatientValidationSchema = z.object( {
    body: z.object( {
        patient: z.object( {
            // createdBy: z
            //     .string( { error: 'Admin id is required' } )
            //     .length( 24, 'Invalid admin id' ),

            name: updatePatientNameValidationSchema,

            gender: z.enum( [ ...Gender ] as [ string, ...string[] ] ).optional(),

            dateOfBirth: z.string().optional(),

            allergies: z.array( z.string() ).optional(),

            contactNo: z
                .string().optional(),

            emergencyContactNo: z.string().optional(),

            bloodGroup: z.enum( [ ...BloodGroup ] as [ string, ...string[] ] ).optional(),

            address: updatePatientAddressValidationSchema,

        } )


    } ),
} );

export const PatientValidations = {
    createPatientValidationSchema,
    updatePatientValidationSchema
}


