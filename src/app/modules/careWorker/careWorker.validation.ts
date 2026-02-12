import { z } from 'zod';
import { BloodGroup, CareWorkerDesignation, Gender } from './careWorker.constant';


const createUserNameValidationSchema = z.object( {
    firstName: z.string().min( 1 ).max( 20 ),
    middleName: z.string().max( 20 ),
    lastName: z.string().max( 20 ),
} );
const createAddressValidationSchema = z.object( {
    address1: z.string().min( 1 ).max( 80 ),
    town: z.string().max( 80 ),
    county: z.string().max( 80 ),
    postcode: z.string().max( 10 ),
} );



export const createCareWorkerValidationSchema = z.object( {
    body: z.object( {
        password: z.string().max( 20 ).optional(),
        careWorker: z.object( {
            name: createUserNameValidationSchema,
            gender: z.enum( [ ...Gender ] as [ string, ...string[] ] ),
            dateOfBirth: z.string().optional(),
            email: z.string().email(),
            designation: z.enum( [ ...CareWorkerDesignation ] as [ string, ...string[] ] ),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloogGroup: z.enum( [ ...BloodGroup ] as [ string, ...string[] ] ).optional(),
            address: createAddressValidationSchema,
            // profileImg: z.string(),
        } ),
    } ),
} );

const updateUserNameValidationSchema = z.object( {
    firstName: z.string().min( 3 ).max( 20 ).optional(),
    middleName: z.string().min( 3 ).max( 20 ).optional(),
    lastName: z.string().min( 3 ).max( 20 ).optional(),
} );

const updateAddressValidationSchema = z.object( {
    address1: z.string().min( 1 ).max( 80 ).optional(),
    town: z.string().max( 80 ).optional(),
    county: z.string().max( 80 ).optional(),
    postcode: z.string().max( 10 ).optional(),
} );

export const updateCareWorkerValidationSchema = z.object( {
    body: z.object( {
        careWorker: z.object( {
            name: updateUserNameValidationSchema,
            address: updateAddressValidationSchema,
            gender: z.enum( [ ...Gender ] as [ string, ...string[] ] ).optional(),
            designation: z.enum( [ ...CareWorkerDesignation ] as [ string, ...string[] ] ).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z.enum( [ ...BloodGroup ] as [ string, ...string[] ] ).optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            // profileImg: z.string().optional(),
        } ),
    } ),
} );

export const AdminValidations = {
    createCareWorkerValidationSchema,
    updateCareWorkerValidationSchema
};