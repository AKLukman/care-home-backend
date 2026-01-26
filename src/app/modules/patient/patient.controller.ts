import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PatientServices } from "./patient.service";

const insertIntoDB = catchAsync( async ( req, res ) => {
    const { patient: patientData } = req.body
    const adminEmail = req?.user?.email
    const result = await PatientServices.insertIntoDB( req.file, patientData, adminEmail )

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient created successfully!",
        data: result
    } )
} )
const getPatientsFromDB = catchAsync( async ( req, res ) => {

    const result = await PatientServices.getPatientsFromDB( req.query )

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patients are retrived successfully!",
        meta: result.meta,
        data: result.result
    } )
} )
const getSinglePatients = catchAsync( async ( req, res ) => {
    const { id } = req.params

    const result = await PatientServices.getSinglePatient( id as string )

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient retrived successfully!",
        data: result
    } )
} )
const deletePatient = catchAsync( async ( req, res ) => {
    const { id } = req.params

    const result = await PatientServices.deletePatient( id as string )

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient deleted successfully!",
        data: result
    } )
} )

const updatePatient = catchAsync( async ( req, res ) => {
    const { id } = req.params
    const { patient } = req.body;

    const result = await PatientServices.updatePatientIntoDB( id as string, patient )

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient updated successfully!",
        data: result
    } )
} )



export const PatientControllers = {
    insertIntoDB,
    getPatientsFromDB,
    getSinglePatients,
    deletePatient,
    updatePatient
}